// =============================
// Smart Crop Advisory Charts
// charts.js
// =============================

document.addEventListener("DOMContentLoaded", () => {

    // NDVI Line Chart
    const ndviCanvas = document.getElementById("ndviChart");

    if (ndviCanvas) {
        new Chart(ndviCanvas, {
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul"
                ],
                datasets: [{
                    label: "NDVI Index",
                    data: [0.42, 0.48, 0.55, 0.63, 0.71, 0.76, 0.81],
                    borderColor: "#10b981",
                    backgroundColor: "rgba(16,185,129,0.2)",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: "#10b981"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }

    // Soil Moisture Chart
    const moistureCanvas = document.getElementById("moistureChart");

    if (moistureCanvas) {
        new Chart(moistureCanvas, {
            type: "bar",
            data: {
                labels: [
                    "Field A",
                    "Field B",
                    "Field C",
                    "Field D"
                ],
                datasets: [{
                    label: "Moisture %",
                    data: [35, 62, 55, 80],
                    backgroundColor: [
                        "#3b82f6",
                        "#10b981",
                        "#f59e0b",
                        "#ef4444"
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Weather Chart
    const weatherCanvas = document.getElementById("weatherChart");

    if (weatherCanvas) {
        new Chart(weatherCanvas, {
            type: "line",
            data: {
                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                datasets: [{
                    label: "Temperature °C",
                    data: [29, 30, 31, 30, 29, 28, 27],
                    borderColor: "#f59e0b",
                    backgroundColor: "rgba(245,158,11,0.2)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

});
