from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# -------------------------------
# Home
# -------------------------------
@app.route("/")
def home():
    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("index.html")


# -------------------------------
# Crop Recommendation API
# -------------------------------
@app.route("/predict_crop", methods=["POST"])
def predict_crop():

    data = request.get_json()

    n = int(data["nitrogen"])
    p = int(data["phosphorus"])
    k = int(data["potassium"])
    ph = float(data["ph"])

    # Dummy Prediction
    if ph > 7:
        crop = "Cotton"
    elif n > 80:
        crop = "Rice"
    elif k > 50:
        crop = "Maize"
    else:
        crop = "Wheat"

    return jsonify({
        "crop": crop
    })


# -------------------------------
# Disease Detection API
# -------------------------------
@app.route("/detect_disease", methods=["POST"])
def detect():

    diseases = [

        {
            "disease":"Leaf Blight",
            "confidence":"96%",
            "medicine":"Mancozeb Spray"
        },

        {
            "disease":"Powdery Mildew",
            "confidence":"93%",
            "medicine":"Sulfur Fungicide"
        },

        {
            "disease":"Healthy Leaf",
            "confidence":"99%",
            "medicine":"No Treatment Needed"
        }

    ]

    return jsonify(random.choice(diseases))


# -------------------------------
# Weather API
# -------------------------------
@app.route("/weather")
def weather():

    return jsonify({

        "temperature":"31°C",

        "humidity":"70%",

        "wind":"8 km/h",

        "city":"Hyderabad"

    })


# -------------------------------
# Irrigation API
# -------------------------------
@app.route("/irrigation")
def irrigation():

    moisture=random.randint(25,80)

    if moisture<40:
        advice="Water Required"

    else:
        advice="No Irrigation Needed"

    return jsonify({

        "soil":moisture,

        "advice":advice

    })


# -------------------------------
# Alerts API
# -------------------------------
@app.route("/alerts")
def alerts():

    return jsonify({

        "alerts":[

            "Heavy Rain Tomorrow",

            "Disease Risk Medium",

            "High Temperature Warning"

        ]

    })


if __name__=="__main__":
    app.run(debug=True)
