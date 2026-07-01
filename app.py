from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("index.html")

@app.route("/api/dashboard")
def dashboard_data():
    return jsonify({
        "temperature": random.randint(25, 35),
        "humidity": random.randint(55, 90),
        "ndvi": round(random.uniform(0.50, 0.90), 2),
        "soil_moisture": random.randint(25, 70),
        "crop": "Rice",
        "weather": "Partly Cloudy"
    })

if __name__ == "__main__":
    app.run(debug=True)
