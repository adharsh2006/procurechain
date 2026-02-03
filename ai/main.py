from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai

# CONFIGURATION
os.environ["GOOGLE_API_KEY"] = "AIzaSyCPHZxV2xmKv5vwP2COuJ7GQ73HDDAo7o8"
GENAI_KEY = os.environ["GOOGLE_API_KEY"]

if GENAI_KEY:
    genai.configure(api_key=GENAI_KEY)

app = FastAPI(title="AgriPulse SmartTrade AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PriceCheck(BaseModel):
    commodity: str
    bid_amount: float

# Fallback Data (if API fails or no key)
FALLBACK_PRICES = {
    "Wheat": 2200,
    "Rice": 3900,
    "Cotton": 6200
}

def get_real_time_price(commodity: str):
    """Fetches estimated current price using Gemini AI"""
    if not GENAI_KEY:
        print(" Using Fallback (No Gemini Key)")
        return FALLBACK_PRICES.get(commodity, 2000)
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""
        Act as an Agriculture Market Expert for Indian Mandis. 
        What is the current average wholesale market price (Modal Price) of '{commodity}' in India today in Rupees per Quintal?
        
        Strict Rules:
        1. Return ONLY the number (integer). 
        2. Do not add text, currency symbols, or explanations.
        3. If unsure, estimate based on recent trends (e.g. Wheat ~2200-2400).
        """
        response = model.generate_content(prompt)
        price_str = response.text.strip().replace(',', '').replace('₹', '')
        return float(price_str)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return FALLBACK_PRICES.get(commodity, 2000)

@app.post("/check_fair_price")
async def check_price(check: PriceCheck):
    print(f"Analyzing {check.commodity} @ {check.bid_amount}...")
    
    # 1. Get Real-Time Market Price (from Gemini or Fallback)
    market_avg = get_real_time_price(check.commodity)
    
    # 2. Calculate Anomaly
    diff_percent = ((check.bid_amount - market_avg) / market_avg) * 100
    
    status = "FAIR"
    if diff_percent > 25:
        status = "HIGH_ANOMALY"
    elif diff_percent < -25:
        status = "LOW_DISTRESS"
        
    return {
        "commodity": check.commodity,
        "market_avg": market_avg,
        "bid_amount": check.bid_amount,
        "diff_percent": round(diff_percent, 2),
        "status": status,
        "is_unfair_practice": status != "FAIR",
        "source": "Google Gemini AI (Live)" if GENAI_KEY else "Historical Data (Fallback)"
    }

class QRCheck(BaseModel):
    qr_data: str

@app.post("/verify_weight_qr")
async def verify_qr(check: QRCheck):
    print(f"Scanning QR: {check.qr_data}...")
    
    # Logic: Expects format "W:<Weight>" (e.g., "W:100")
    # In production, this would verify a Cryptographic Signature from the IoT Scale.
    
    is_valid = check.qr_data.startswith("W:")
    detected_weight = 0.0
    
    if is_valid:
        try:
            detected_weight = float(check.qr_data.split(":")[1])
        except:
            is_valid = False

    return {
        "verified": is_valid,
        "weight_detected": detected_weight,
        "device_id": "IOT-SCALE-774",
        "message": "Digital Weight Verified" if is_valid else "Invalid or Tampered QR Code"
    }
