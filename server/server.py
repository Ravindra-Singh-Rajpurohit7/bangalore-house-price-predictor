from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import util

app = FastAPI(title="Bangalore Home Price Predictor API")

# --- CORS Settings ---
# React (Port 3000) se requests allow karne ke liye yeh bohot zaroori hai
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development ke liye sabhi origins allowed hain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FastAPI startup event: Server shuru hote hi model load ho jayega
@app.on_event("startup")
async def startup_event():
    util.load_saved_artifacts()

# Pydantic Model: Predict API ke liye incoming data ka structure define karne ke liye
class PricePredictionInput(BaseModel):
    location: str
    total_sqft: float
    bhk: int
    bath: int

# --- API Endpoints ---

@app.get("/")
def home():
    return {"message": "Welcome to Bangalore Home Price Prediction API!"}

@app.get("/get_location_names")
async def get_location_names():
    """Yeh route frontend ko saari locations ki list bhejega drop-down ke liye"""
    return {
        "locations": util.get_location_names()
    }

@app.post("/predict_home_price")
async def predict_home_price(data: PricePredictionInput):
    """Yeh route frontend se data lekar estimated price return karega"""
    estimated_price = util.get_estimated_price(
        data.location,
        data.total_sqft,
        data.bhk,
        data.bath
    )
    return {
        "estimated_price": estimated_price
    }