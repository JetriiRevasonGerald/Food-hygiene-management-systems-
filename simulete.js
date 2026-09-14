document.addEventListener("DOMContentLoaded", () => {

    const practical1Btn = document.getElementById("showPractical1");
    const practical2Btn = document.getElementById("showPractical2");

    const practical1Section = document.getElementById("practical1Section");
    const practical2Section = document.getElementById("practical2Section");

    if (practical1Btn && practical2Btn) {
        practical1Btn.addEventListener("click", () => {
            practical1Section.style.display = "block";
            practical2Section.style.display = "none";
            practical1Btn.classList.add("active");
            practical2Btn.classList.remove("active");
        });

        practical2Btn.addEventListener("click", () => {
            practical1Section.style.display = "none";
            practical2Section.style.display = "block";
            practical1Btn.classList.remove("active");
            practical2Btn.classList.add("active");
        });
    }

    // Practical 1 Submission
    const practical1Form = document.getElementById("practical1Form");

    if (practical1Form) {
        practical1Form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const getVal = (id) => {
                const el = document.getElementById(id);
                return el ? el.value : "";
            };

            const simulationData = {
                user_id: 1,
                simulation_type: "Practical 1",
                temperature: getVal("p1Temperature"),
                hand_hygiene: getVal("p1HandHygiene") || getVal("p1Hand_Hygiene"),
                cleaning: getVal("p1Cleaning"),
                water_quality: getVal("p1Water"),
                waste_management: getVal("p1Waste")
            };

            try {
                const response = await fetch("../backend/api/simulation.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(simulationData)
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    alert(result.message || "Practical 1 simulation failed.");
                    return;
                }

                localStorage.setItem("foodHygieneSimulation", JSON.stringify(result));
                window.location.href = "results.html";

            } catch (error) {
                console.error("Practical 1 error:", error);
                alert("Unable to connect to the simulation server.");
            }
        });
    }

    // Practical 2 Submission
    const practical2Form = document.getElementById("practical2Form");

    if (practical2Form) {
        practical2Form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const getVal = (id) => {
                const el = document.getElementById(id);
                return el ? el.value : "";
            };

            const pestVal = getVal("p2PestControl");

            const simulationData = {
                user_id: 1,
                simulation_type: "Practical 2",
                crossContamination: getVal("p2CrossContamination") || getVal("p2Cross_Contamination"),
                foodHandling: getVal("p2FoodHandling") || getVal("p2Food_Handling"),
                pestControl: pestVal === "poor" ? "present" : (pestVal === "moderate" ? "possible" : "controlled"),
                temperature: getVal("p2Temperature")
            };

            try {
                const response = await fetch("../backend/api/simulation.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(simulationData)
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    alert(result.message || "Practical 2 simulation failed.");
                    return;
                }

                localStorage.setItem("foodHygieneSimulation", JSON.stringify(result));
                window.location.href = "results.html";

            } catch (error) {
                console.error("Practical 2 error:", error);
                alert("Unable to connect to the simulation server.");
            }
        });
    }
});