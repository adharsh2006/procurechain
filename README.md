# ProcureChain: Enterprise Blockchain-AI Procurement Platform

**ProcureChain** is a decentralized, transparent, and role-based procurement ecosystem designed for Government-to-Farmer (G2F) and B2B agricultural trade. It solves critical issues in traditional supply chains—bid rigging, delayed payments, and lack of transparency—by leveraging **Ethereum/Polygon Blockchain**, **AI-driven Price Discovery**, and **IoT Weight Verification**.

---

## 🚀 Key Features

### 1. 🛡️ Trustless Blockchain Infrastructure
- **Smart Contracts (`AgriProcure.sol`)**: All tender logic, listing creation, and fund escrow are handled on-chain.
- **Sealed Bid Reverse Auction**: Vendors submit encrypted bids. Prices are hidden until the deadline to prevent bid rigging and cartel formation.
- **Immutable Audit Trail**: Every action (Listing, Bid, Approval, Payment) creates a tamper-proof hash on the ledger.

### 2. 🧠 AI-Powered Fair Pricing & Outlier Detection
- **Real-Time Price Discovery**: Integrates with **Gemini Pro** and **Agmarknet Data** to fetch live APMC / SmartTrade Market prices.
- **Anomaly Detection**: Uses the **Isolation Forest Algorithm** (Scikit-Learn) to analyze bid patterns and flag suspicious outliers (e.g., predatory pricing or cartel behavior).
- **Price Forecasting**: Predicts future price trends to help farmers decide *when* to sell.

### 3. ⚖️ IoT & Quality Assurance
- **IoT Weight Verification**: Farmers scan a QR code on a "Digital Scale". The weight is cryptographically signed and sent directly to the blockchain, eliminating manual data entry errors or weighing fraud.
- **Quality Grading**: Automated grade mapping (Grade A+, A, B) determines the MSP (Minimum Support Price) logic in the Smart Contract.

### 4. 🏛️ Role-Based Enterprise Architecture
- **Farmer**: Voice-enabled listing, AI price insights, instant "Sell Produce" flow. Fully localized in **English, Hindi, Tamil, and Telugu**.
- **Vendor**: Secure "Sealed Bid" interface, live "Reverse Auction" status (Blind).
- **Officer**: "Smart Validation" desk that auto-checks deadlines, KYC, and Quality before allowing a **Digital Signature**.
- **Auditor**: Forensic tools to verify Merkle Roots and hash integrity of any past transaction.

---

## 🏗️ Technical Architecture

### Frontend Layer (Next.js 14 + TypeScript)
- **Framework**: Next.js (App Router) for Server-Side Rendering (SSR) and SEO.
- **UI System**: Tailwind CSS + Lucide React for a "Government/Fintech" aesthetic (Slate/Blue palette).
- **Localization**: Custom `LanguageContext` provider supporting dynamic switching between 4+ languages for all UI text.
- **State**: React Hooks for managing complex multi-step modal flows (Bidding, Selling).
- **Web3 Integration**: `Ethers.js` for communicating with the EVM (Ethereum Virtual Machine).

### Intelligence Layer (Python FastAPI)
- **API**: FastAPI providing high-performance endpoints (`/predict_price`, `/verify_qr`, `/detect_anomaly`).
- **Machine Learning**: 
  - **Isolation Forest**: Unsupervised learning model trained on historical bid data to detect anomalies.
  - **Google Gemini**: LLM integration for contextual market analysis and multi-lingual voice support.
- **Data Source**: Integrated `Agmarknet` CSV datasets for historical baseline training.

### Blockchain Layer (Hardhat + Solidity)
- **Contract**: `AgriProcure.sol` (ERC-compliant logic).
- **Functions**: `listCrop()`, `placeBid()` (with modifier checks), `depositEscrow()`, `releasePayment()`.
- **Events**: Emits indexed events for the "Timeline Tracker" to consume.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v18+
- Python 3.9+
- Metamask (or Hardhat Local Node)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/procurechain.git
cd procurechain
```

### 2. Blockchain Setup (Hardhat)
```bash
cd chain
npm install
npx hardhat node # Starts local blockchain on port 8545
# Deploy Contracts
npx hardhat run scripts/deploy.js --network localhost
```

### 3. AI Backend Setup (FastAPI)
```bash
cd ../ai
pip install -r requirements.txt
# Requires .env file with GOOGLE_API_KEY
uvicorn main:app --reload --port 8001
```

### 4. Frontend Client (Next.js)
```bash
cd ../web
npm install
npm run dev
# App runs at http://localhost:3000
```

---

## 📖 How It Works (End-to-End Flow)

1.  **Farmer Lists Produce**:
    -   Farmer logs in, speaks "I want to sell Wheat".
    -   AI parses intent. IoT QR code is scanned.
    -   Smart Contract creates a `LISTING` on blockchain.

2.  **Vendor Bids (Blind)**:
    -   Vendors see the tender.
    -   They submit a **Sealed Bid**. The specific amount is hashed.
    -   AI Backend checks the bid against the `Anomaly Model`. If it varies >15% from market norm, it is flagged.

3.  **Officer Approves**:
    -   Officer views the "Pending" list.
    -   **Smart Validator** engine runs: Checks Deadline 🕒, L1 Logic 📉, and Quality 🏅.
    -   Officer attaches **Digital Signature** to release the Work Order.

4.  **Payment & Audit**:
    -   Upon delivery, funds in Escrow are released via Smart Contract.
    -   **Auditor** sees the immutable log. Can use the "Forensic Verifier" to mathematically prove the transaction occurred and was signed by the specific Officer.

---

## 🛡️ Security Measures
- **Re-Entrancy Guards**: Applied to all payment functions in Solidity.
- **Role-Based Access Control (RBAC)**: `Ownable` and custom modifiers ensure Vendors cannot approve their own bids.
- **Data Privacy**: Vendor bids remain encrypted (Blind) until the Tender Deadline expires.

---

## 🔮 Future Roadmap
- **Zero-Knowledge Proofs (ZK-Snarks)**: For verifying vendor solvency without revealing balance.
- **Supply Chain Twin**: GIS integration for live truck tracking.
- **DAO Governance**: Voting mechanism for Minimum Support Price (MSP) adjustments.
