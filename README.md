# Bangalore House Price Predictor

A Machine Learning web application that predicts house prices in Bangalore based on location, total square feet area, number of bedrooms (BHK), and bathrooms.

## Project Overview

This project uses a trained Machine Learning model to estimate house prices in Bangalore. Users can enter property details through a React frontend, and the FastAPI backend returns the predicted price.

## Features

* Predict house prices in Bangalore
* Location-based price estimation
* Interactive React user interface
* FastAPI REST API backend
* Machine Learning model integration
* Dynamic location dropdown

## Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS

### Backend

* FastAPI
* Python
* NumPy
* Pickle

### Machine Learning

* Scikit-Learn
* Linear Regression
* Pandas
* NumPy

## Project Structure

```text
BHP/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── server.py
│   ├── util.py
│   └── model/
│       ├── columns.json
│       └── banglore_home_prices_model.pickle
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd BHP
```

### Backend Setup

```bash
cd server

pip install fastapi uvicorn numpy pandas scikit-learn
```

Run Backend Server:

```bash
uvicorn server:app --reload
```

Backend will start at:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend Setup

```bash
cd client

npm install
npm start
```

Frontend will start at:

```text
http://localhost:3000
```

## API Endpoints

### Get Locations

```http
GET /get_location_names
```

Response:

```json
{
  "locations": [
    "1st phase jp nagar",
    "indira nagar",
    "whitefield"
  ]
}
```

### Predict House Price

```http
POST /predict_home_price
```

Request Body:

```json
{
  "location": "1st phase jp nagar",
  "total_sqft": 1200,
  "bhk": 2,
  "bath": 2
}
```

Response:

```json
{
  "estimated_price": 85.4
}
```

## Machine Learning Pipeline

1. Data Collection
2. Data Cleaning
3. Feature Engineering
4. Outlier Removal
5. One-Hot Encoding
6. Model Training
7. Model Serialization
8. API Deployment

## Future Improvements

* Deploy on AWS/Render/Vercel
* User Authentication
* Property Recommendation System
* Advanced ML Models
* Interactive Analytics Dashboard

## Author

Ravindra Singh Rajpurohit

## PROJECT-UI
<img width="631" height="284" alt="image" src="https://github.com/user-attachments/assets/13cbea6b-f26a-4635-b226-330c493e2979" />

## License

This project is developed for educational and learning purposes.
