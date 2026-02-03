// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgriProcure is Ownable {
    
    enum Status { LISTED, BIDDING_OPEN, LOCKED_IN_ESCROW, DELIVERED, PAYMENT_RELEASED, DISPUTED }
    enum Grade { A_PLUS, A, B, C } 

    struct CropListing {
        uint id;
        address farmer;
        string cropName; 
        uint quantity;  // In Quintals
        Grade quality;  // Verified by "IoT"
        uint msp;       // Base MSP
        uint highestBid;
        address highestBidder;
        Status status;
        uint256 escrowAmount; 
        bool paymentReleased;
    }

    uint public listingCount;
    mapping(uint => CropListing) public listings;
    
    // Govt MSP Configuration (Base Price for Grade A)
    mapping(string => uint) public governmentMSP;

    mapping(address => uint) public farmerReputation;
    mapping(address => uint) public buyerReputation;

    event CropListed(uint indexed id, address indexed farmer, string crop, Grade grade);
    event NewBid(uint indexed id, address indexed bidder, uint amount);
    event EscrowLocked(uint indexed id, address indexed bidder, uint amount);
    event PaymentReleased(uint indexed id, address indexed farmer, uint amount);

    constructor() Ownable(msg.sender) {}

    // --- Govt Functions ---
    function setMSP(string memory _crop, uint _pricePerQuintal) external onlyOwner {
        governmentMSP[_crop] = _pricePerQuintal;
    }

    // --- Farmer Functions ---
    function listCrop(string memory _crop, uint _quantity, Grade _grade, string memory _audioHash) external {
        uint baseMsp = governmentMSP[_crop];
        // Ensure Farmer has reputation or basic check
        if(farmerReputation[msg.sender] == 0) farmerReputation[msg.sender] = 50; 

        listingCount++;
        listings[listingCount] = CropListing({
            id: listingCount,
            farmer: msg.sender,
            cropName: _crop,
            quantity: _quantity,
            quality: _grade,
            msp: baseMsp, 
            highestBid: 0,
            highestBidder: address(0),
            status: Status.BIDDING_OPEN,
            escrowAmount: 0,
            paymentReleased: false
        });

        emit CropListed(listingCount, msg.sender, _crop, _grade);
    }

    // --- Buyer Functions ---
    function placeBid(uint _listingId, uint _bidPerQuintal) external {
        CropListing storage item = listings[_listingId];
        require(item.status == Status.BIDDING_OPEN, "Bidding Closed");
        
        // Quality Logic:
        // Grade A+ (0) : 110% of MSP
        // Grade A (1): 100% of MSP
        // Grade B (2): 90% of MSP
        // Grade C (3): 80% of MSP
        uint effectiveMSP = item.msp;
        if(item.quality == Grade.A_PLUS) effectiveMSP = (item.msp * 110) / 100;
        if(item.quality == Grade.B) effectiveMSP = (item.msp * 90) / 100;
        if(item.quality == Grade.C) effectiveMSP = (item.msp * 80) / 100;

        require(_bidPerQuintal >= effectiveMSP, "Bid Below Quality Adjusted MSP!");
        require(_bidPerQuintal > item.highestBid, "Bid too low");

        item.highestBid = _bidPerQuintal;
        item.highestBidder = msg.sender;

        emit NewBid(_listingId, msg.sender, _bidPerQuintal);
    }

    function depositEscrow(uint _listingId) external payable {
        CropListing storage item = listings[_listingId];
        require(msg.sender == item.highestBidder, "Not highest bidder");
        require(msg.value == (item.highestBid * item.quantity), "Incorrect Amount"); 
        
        item.escrowAmount = msg.value;
        item.status = Status.LOCKED_IN_ESCROW;
        
        emit EscrowLocked(_listingId, msg.sender, msg.value);
    }
    
    function confirmDeliveryAndReleasePayment(uint _listingId) external {
        CropListing storage item = listings[_listingId];
        require(msg.sender == item.highestBidder || msg.sender == owner(), "Buyer/Admin Only");
        require(item.status == Status.LOCKED_IN_ESCROW, "No funds in Escrow");

        uint amount = item.escrowAmount;
        item.escrowAmount = 0;
        item.status = Status.PAYMENT_RELEASED;
        item.paymentReleased = true;

        farmerReputation[item.farmer] += 5;
        buyerReputation[item.highestBidder] += 5;

        (bool sent, ) = payable(item.farmer).call{value: amount}("");
        require(sent, "Transfer Failed");

        emit PaymentReleased(_listingId, item.farmer, amount);
    }
}
