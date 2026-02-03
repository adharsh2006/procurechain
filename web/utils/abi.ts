export const AGRI_PROCURE_ABI = [
    "function listCrop(string memory _crop, uint _quantity, uint8 _grade, string memory _audioHash) external",
    "function placeBid(uint _listingId, uint _bidPerQuintal) external",
    "function listings(uint) view returns (uint, address, string, uint, uint8, uint, uint, address, uint8, uint, bool)",
    "event CropListed(uint indexed id, address indexed farmer, string crop, uint8 grade)",
    "event NewBid(uint indexed id, address indexed bidder, uint amount)"
];

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
