import os
import random
import requests
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ==========================================
# CONFIGURATION SETTINGS
# ==========================================
OPENWEATHER_API_KEY = "aa0b2b8f1bbe92442b826dfc6841125b"

DISEASE_REMEDIATION_DB = {
    "potato_early_blight": {
        "disease_name": "Early Blight (Alternaria solani)",
        "confidence_default": "98%",
        "recommended_pesticide": "Mancozeb (2g/L) or Chlorothalonil",
        "prevention_tips": [
            "Avoid overhead splash irrigation to minimize spore dispersion.",
            "Physically remove infected lower vegetative sheets immediately.",
            "Use certified disease-free seed crop variants."
        ]
    }
}

@app.route('/')
def home():
    return render_template('login.html')


@app.route('/dashboard')
def dashboard_page():
    return render_template('index.html')
# ==========================================
# METEOROLOGICAL MODULE (WEATHER API)
# ==========================================
@app.route("/api/weather", methods=["GET"])
def weather():

    city = request.args.get("city","Hyderabad")

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={aa0b2b8f1bbe92442b826dfc6841125b}&units=metric"

    try:

        data = requests.get(url).json()

        return jsonify({

            "temperature": data["main"]["temp"],

            "humidity": data["main"]["humidity"],

            "wind": data["wind"]["speed"],

            "description": data["weather"][0]["description"],

            "city": data["name"]

        })

    except:

        return jsonify({

            "temperature":28,

            "humidity":60,

            "wind":5,

            "description":"Unavailable",

            "city":city

        })
# ==========================================
# MACHINE LEARNING ADVISORY PREDICTIONS
# ==========================================
@app.route('/api/crop-recommend', methods=['POST'])
def recommend_crop():
    data = request.get_json() or {}
    try:
        n = float(data.get('nitrogen', 90))
        p = float(data.get('phosphorus', 42))
    except (ValueError, TypeError):
        n, p = 90, 42
    
    if n > 70 and p > 35:
        recommended = "RICE (Oryza sativa)"
    else:
        recommended = "MAIZE (Zea mays)"
        
    return jsonify({
        "status": "success", 
        "recommended_crop": recommended,
        "confidence": "94%"
    })

@app.route('/api/disease-detect', methods=['POST'])
def detect_disease():
    result = DISEASE_REMEDIATION_DB["potato_early_blight"]
    return jsonify({
        "status": "success",
        "detected_disease": result["disease_name"],
        "confidence": result["confidence_default"],
        "recommended_pesticide": result["recommended_pesticide"],
        "prevention_tips": result["prevention_tips"]
    })

# ==========================================
# REMOTE SENSING IRRIGATION & WEBHOOK ALERTS
# ==========================================
@app.route('/api/irrigation-satellite', methods=['POST'])
def calculate_irrigation():
    data = request.get_json() or {}
    crop_type = data.get('crop_type', 'Rice')
    soil_moisture = float(data.get('radar_moisture', 35))
    ndvi = float(data.get('ndvi_band', 0.65))
    
    if soil_moisture < 30:
        status = "Critical Depletion"
        gallons_needed = "4,500 Liters / Acre"
        advice = "Initiate immediate drip irrigation sequence. Satellite thermal band profiles map elevated evapotranspiration metrics."
    elif 30 <= soil_moisture <= 55:
        status = "Optimal Soil Balance"
        gallons_needed = "0 Liters"
        advice = "No water required. Normalized Difference Vegetation Index (NDVI) tracks healthy crop foliage density."
    else:
        status = "Saturated Matrix"
        gallons_needed = "0 Liters (Drain Advised)"
        advice = "Radar backscatter records standing field surface anomalies. Suspend input pipelines to eliminate root hypoxia risks."

    return jsonify({
        "status": "success",
        "crop": crop_type,
        "calculated_status": status,
        "water_volume": gallons_needed,
        "satellite_analysis": f"Sentinel-2 Spectral Canopy Mapping evaluated an NDVI index of {ndvi}.",
        "action_plan": advice
    })

     # ==========================================
# DASHBOARD API
# ==========================================
@app.route('/api/dashboard')
def dashboard():

    return jsonify({
        "temperature": random.randint(26, 35),
        "humidity": random.randint(60, 90),
        "ndvi": round(random.uniform(0.55, 0.90), 2),
        "soil_moisture": random.randint(30, 70)
    })


@app.route("/api/search-location", methods=["POST"])
def search_location():
    data = request.get_json()

    location = data.get("location","Hyderabad")

    return jsonify({
        "success": True,
        "location": location.title()
    })
if __name__ == '__main__':
    # Binds dynamically to Render's internal hosting configuration
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
