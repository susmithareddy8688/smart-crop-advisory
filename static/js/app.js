// -------------------------------
// Crop Recommendation
// -------------------------------

async function predictCrop() {

    const nitrogen = document.getElementById("nitrogen").value;
    const phosphorus = document.getElementById("phosphorus").value;
    const potassium = document.getElementById("potassium").value;
    const ph = document.getElementById("ph").value;

    if (
        nitrogen === "" ||
        phosphorus === "" ||
        potassium === "" ||
        ph === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const response = await fetch("/predict_crop", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nitrogen,

            phosphorus,

            potassium,

            ph

        })

    });

    const data = await response.json();

    document.getElementById("cropResult").classList.remove("hidden");

    document.getElementById("cropName").innerHTML =
        "🌾 " + data.crop;

}



// -------------------------------
// Disease Detection
// -------------------------------

async function detectDisease() {

    const response = await fetch("/detect_disease", {

        method: "POST"

    });

    const data = await response.json();

    document.getElementById("diseaseCard")
        .classList.remove("hidden");

    document.getElementById("diseaseName").innerHTML =
        data.disease;

    document.getElementById("confidence").innerHTML =
        data.confidence;

    document.getElementById("medicine").innerHTML =
        data.medicine;

}



// -------------------------------
// Irrigation
// -------------------------------

async function loadIrrigation() {

    const response = await fetch("/irrigation");

    const data = await response.json();

    document.getElementById("irrigationResult")
        .classList.remove("hidden");

    document.getElementById("soilValue").innerHTML =
        data.soil + "%";

    document.getElementById("advice").innerHTML =
        data.advice;

}



// -------------------------------
// Weather
// -------------------------------

async function loadWeather() {

    const response = await fetch("/weather");

    const data = await response.json();

    document.getElementById("temperature").innerHTML =
        data.temperature;

    document.getElementById("humidity").innerHTML =
        data.humidity;

    document.getElementById("tempCard").innerHTML =
        data.temperature;

    document.getElementById("humidityCard").innerHTML =
        data.humidity;

    document.getElementById("windCard").innerHTML =
        data.wind;

    document.getElementById("cityCard").innerHTML =
        data.city;

}



// -------------------------------
// Farmer Alerts
// -------------------------------

async function loadAlerts() {

    const response = await fetch("/alerts");

    const data = await response.json();

    const container =
        document.getElementById("alertContainer");

    container.innerHTML = "";

    data.alerts.forEach(alert => {

        container.innerHTML += `

        <div class="bg-red-100 border-l-4 border-red-500 p-5 rounded">

            ${alert}

        </div>

        `;

    });

}



// -------------------------------
// Auto Refresh
// -------------------------------

window.onload = function () {

    loadWeather();

    loadAlerts();

};



// Refresh weather every minute

setInterval(loadWeather, 60000);



// Refresh alerts every two minutes

setInterval(loadAlerts, 120000);


// ==========================
// Dashboard Data
// ==========================

async function loadDashboard() {

    const response = await fetch("/api/dashboard");
    const data = await response.json();

    document.getElementById("dash-text-temp").innerText =
        data.temperature + "°C";

    document.getElementById("dash-text-humidity").innerText =
        data.humidity + "%";

    document.getElementById("dash-text-ndvi").innerText =
        data.ndvi;

    document.getElementById("dash-text-moisture").innerText =
        data.soil_moisture + "%";
}

// ==========================
// Crop Recommendation
// ==========================

async function requestCropPrediction() {

    const nitrogen = document.getElementById("form-n").value;
    const phosphorus = document.getElementById("form-p").value;

    const response = await fetch("/api/crop-recommend", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nitrogen: nitrogen,
            phosphorus: phosphorus

        })

    });

    const data = await response.json();

    document.getElementById("predictionResultBox")
        .classList.remove("hidden");

    document.getElementById("predictionOutputLabel")
        .innerText = data.recommended_crop;
}

// ==========================
// Disease Detection
// ==========================

async function uploadAndAnalyzeLeaf() {

    const response = await fetch("/api/disease-detect", {

        method: "POST"

    });

    const data = await response.json();

    document.getElementById("inferenceResultsBox")
        .classList.remove("hidden");

    document.getElementById("lbl-detected-disease")
        .innerText = data.detected_disease;

    document.getElementById("lbl-confidence")
        .innerText = data.confidence;

    document.getElementById("lbl-recommended-pesticide")
        .innerText = data.recommended_pesticide;

    const tips = document.getElementById("list-prevention-tips");

    tips.innerHTML = "";

    data.prevention_tips.forEach(tip => {

        const li = document.createElement("li");
        li.innerText = tip;
        tips.appendChild(li);

    });

}

// ==========================
// Auto Refresh Dashboard
// ==========================

loadDashboard();

setInterval(loadDashboard,5000);
