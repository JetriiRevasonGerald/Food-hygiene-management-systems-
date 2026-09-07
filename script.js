// =========================================
// LOGIN JAVASCRIPT
// =========================================

// Get login elements
const password = document.getElementById("password");
const showPasswordBtn = document.getElementById("showPasswordBtn");

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");


// =========================================
// SHOW / HIDE PASSWORD
// =========================================

if (password && showPasswordBtn) {

    showPasswordBtn.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";
            showPasswordBtn.textContent = "Hide";

        } else {

            password.type = "password";
            showPasswordBtn.textContent = "Show";

        }

    });

}


// =========================================
// LOGIN FORM
// =========================================

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const userPassword =
            document.getElementById("password").value.trim();


        // Check empty fields
        if (username === "" || userPassword === "") {

            message.textContent =
                "Please enter username and password.";

            message.className = "message error";

            return;
        }


        // Temporary login
        if (
            username === "admin" &&
            userPassword === "admin123"
        ) {

            message.textContent =
                "Login successful!";

            message.className =
                "message success";


            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 1000);


        } else {

            message.textContent =
                "Invalid username or password.";

            message.className =
                "message error";

        }

    });

}


// =========================================
// DASHBOARD LOGOUT
// =========================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );


        if (confirmLogout) {

            window.location.href = "login.html";

        }

    });

}

// =========================================
// FOOD HYGIENE COMPLIANCE ASSESSMENT
// =========================================

const assessmentForm =
    document.getElementById("assessmentForm");

const assessmentResult =
    document.getElementById("assessmentResult");


if (assessmentForm && assessmentResult) {

    assessmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Total number of criteria
            const totalCriteria = 10;


            // Counters
            let compliant = 0;
            let nonCompliant = 0;
            let notApplicable = 0;


            // Check every criterion
            for (let i = 1; i <= totalCriteria; i++) {

                const selected =
                    document.querySelector(
                        `input[name="q${i}"]:checked`
                    );


                // If unanswered
                if (!selected) {

                    assessmentResult.style.display =
                        "block";

                    assessmentResult.className =
                        "assessment-result poor";

                    assessmentResult.innerHTML = `
                        <h3>Incomplete Assessment</h3>

                        <p>
                            Please answer all assessment
                            criteria before submitting.
                        </p>
                    `;

                    return;
                }


                // Count responses
                if (selected.value === "1") {

                    compliant++;

                }

                else if (selected.value === "0") {

                    nonCompliant++;

                }

                else if (selected.value === "na") {

                    notApplicable++;

                }

            }


            // Applicable criteria
            const applicableCriteria =
                compliant + nonCompliant;


            // Prevent division by zero
            if (applicableCriteria === 0) {

                assessmentResult.style.display =
                    "block";

                assessmentResult.className =
                    "assessment-result poor";

                assessmentResult.innerHTML = `
                    <h3>No Applicable Criteria</h3>

                    <p>
                        At least one criterion must be
                        applicable to calculate compliance.
                    </p>
                `;

                return;
            }


            // Calculate compliance percentage
            const compliancePercentage =
                (compliant / applicableCriteria) * 100;


            // =========================================
            // CLASSIFICATION
            // =========================================

            let classification;
            let resultClass;


            if (compliancePercentage >= 80) {

                classification = "High Compliance";
                resultClass = "good";

            }

            else if (compliancePercentage >= 60) {

                classification = "Moderate Compliance";
                resultClass = "moderate";

            }

            else {

                classification = "Low Compliance";
                resultClass = "poor";

            }


            // =========================================
            // DISPLAY RESULT
            // =========================================

            assessmentResult.style.display =
                "block";

            assessmentResult.className =
                `assessment-result ${resultClass}`;


            assessmentResult.innerHTML = `

                <h3>Assessment Completed</h3>

                <p>
                    <strong>Compliant:</strong>
                    ${compliant}
                </p>

                <p>
                    <strong>Non-compliant:</strong>
                    ${nonCompliant}
                </p>

                <p>
                    <strong>Not Applicable:</strong>
                    ${notApplicable}
                </p>

                <p>
                    <strong>Applicable Criteria:</strong>
                    ${applicableCriteria}
                </p>

                <p>
                    <strong>Compliance Percentage:</strong>
                    ${compliancePercentage.toFixed(1)}%
                </p>

                <p>
                    <strong>Classification:</strong>
                    ${classification}
                </p>

            `;


            // =========================================
            // SAVE ASSESSMENT RESULT
            // =========================================

            const assessmentData = {

                compliant: compliant,

                nonCompliant: nonCompliant,

                notApplicable: notApplicable,

                applicableCriteria:
                    applicableCriteria,

                compliancePercentage:
                    compliancePercentage.toFixed(1),

                classification:
                    classification,

                date:
                    new Date().toLocaleString()

            };


            localStorage.setItem(
                "foodHygieneAssessment",
                JSON.stringify(assessmentData)
            );


            // Scroll to result
            assessmentResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );


    // =========================================
    // RESET ASSESSMENT
    // =========================================

    assessmentForm.addEventListener(
        "reset",
        function () {

            assessmentResult.style.display =
                "none";

            assessmentResult.innerHTML = "";

            localStorage.removeItem(
                "foodHygieneAssessment"
            );

        }
    );

}
 // =========================================
// FOOD HYGIENE SIMULATION JAVASCRIPT
// =========================================


// =========================================
// GET SIMULATION ELEMENTS
// =========================================

const simulationForm =
    document.getElementById("simulationForm");

const simulationResult =
    document.getElementById("simulationResult");


// =========================================
// RUN SIMULATION
// =========================================

if (simulationForm && simulationResult) {

    simulationForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();


        // =========================================
        // GET SELECTED CONDITIONS
        // =========================================

        const temperature =
            document.getElementById("temperature").value;

        const handHygiene =
            document.getElementById("handHygiene").value;

        const crossContamination =
            document.getElementById("crossContamination").value;

        const waterQuality =
            document.getElementById("waterQuality").value;

        const cleaning =
            document.getElementById("cleaning").value;

        const pestControl =
            document.getElementById("pestControl").value;

        const wasteManagement =
            document.getElementById("wasteManagement").value;

        const foodHandling =
            document.getElementById("foodHandling").value;


        // =========================================
        // VALIDATE INPUT
        // =========================================

        if (
            temperature === "" ||
            handHygiene === "" ||
            crossContamination === "" ||
            waterQuality === "" ||
            cleaning === "" ||
            pestControl === "" ||
            wasteManagement === "" ||
            foodHandling === ""
        ) {

            alert(
                "Please select a condition for all simulation parameters."
            );

            return;
        }


        // =========================================
        // INITIALIZE SIMULATION
        // =========================================

        let riskScore = 0;

        let riskFactors = [];

        let recommendations = [];


        // =========================================
        // TEMPERATURE SIMULATION
        // =========================================

        if (temperature === "safe") {

            riskScore += 0;

        }

        else if (temperature === "moderate") {

            riskScore += 2;

            riskFactors.push(
                "Moderate food storage temperature"
            );

            recommendations.push(
                "Review and improve food storage temperature control."
            );

        }

        else if (temperature === "unsafe") {

            riskScore += 4;

            riskFactors.push(
                "Unsafe food storage temperature"
            );

            recommendations.push(
                "Improve temperature control and safe food storage practices."
            );
        }


        // =========================================
        // HAND HYGIENE SIMULATION
        // =========================================

        if (handHygiene === "good") {

            riskScore += 0;

        }

        else if (handHygiene === "poor") {

            riskScore += 4;

            riskFactors.push(
                "Poor hand hygiene"
            );

            recommendations.push(
                "Improve hand washing practices and personal hygiene."
            );
        }


        // =========================================
        // CROSS-CONTAMINATION SIMULATION
        // =========================================

        if (crossContamination === "controlled") {

            riskScore += 0;

        }

        else if (crossContamination === "possible") {

            riskScore += 3;

            riskFactors.push(
                "Possible cross-contamination"
            );

            recommendations.push(
                "Improve separation between raw and ready-to-eat foods."
            );

        }

        else if (crossContamination === "high") {

            riskScore += 5;

            riskFactors.push(
                "High cross-contamination risk"
            );

            recommendations.push(
                "Take immediate action to prevent cross-contamination."
            );
        }


        // =========================================
        // WATER QUALITY SIMULATION
        // =========================================

        if (waterQuality === "safe") {

            riskScore += 0;

        }

        else if (waterQuality === "uncertain") {

            riskScore += 2;

            riskFactors.push(
                "Uncertain water quality"
            );

            recommendations.push(
                "Verify the safety and suitability of water used for food handling."
            );

        }

        else if (waterQuality === "unsafe") {

            riskScore += 4;

            riskFactors.push(
                "Unsafe water quality"
            );

            recommendations.push(
                "Do not use unsafe water for food preparation or cleaning."
            );
        }


        // =========================================
        // CLEANING SIMULATION
        // =========================================

        if (cleaning === "good") {

            riskScore += 0;

        }

        else if (cleaning === "moderate") {

            riskScore += 2;

            riskFactors.push(
                "Moderate cleaning and sanitation"
            );

            recommendations.push(
                "Improve cleaning and sanitation procedures."
            );

        }

        else if (cleaning === "poor") {

            riskScore += 4;

            riskFactors.push(
                "Poor cleaning and sanitation"
            );

            recommendations.push(
                "Improve cleaning and sanitation of food-contact surfaces and equipment."
            );
        }


        // =========================================
        // PEST CONTROL SIMULATION
        // =========================================

        if (pestControl === "controlled") {

            riskScore += 0;

        }

        else if (pestControl === "possible") {

            riskScore += 3;

            riskFactors.push(
                "Possible pest activity"
            );

            recommendations.push(
                "Strengthen pest prevention and monitoring measures."
            );

        }

        else if (pestControl === "present") {

            riskScore += 5;

            riskFactors.push(
                "Pest presence detected"
            );

            recommendations.push(
                "Take corrective action to control pest presence."
            );
        }


        // =========================================
        // WASTE MANAGEMENT SIMULATION
        // =========================================

        if (wasteManagement === "good") {

            riskScore += 0;

        }

        else if (wasteManagement === "moderate") {

            riskScore += 2;

            riskFactors.push(
                "Moderate waste management"
            );

            recommendations.push(
                "Improve waste collection and disposal practices."
            );

        }

        else if (wasteManagement === "poor") {

            riskScore += 4;

            riskFactors.push(
                "Poor waste management"
            );

            recommendations.push(
                "Improve waste management to reduce contamination and pest risks."
            );
        }


        // =========================================
        // FOOD HANDLING SIMULATION
        // =========================================

        if (foodHandling === "safe") {

            riskScore += 0;

        }

        else if (foodHandling === "moderate") {

            riskScore += 2;

            riskFactors.push(
                "Moderate food handling practices"
            );

            recommendations.push(
                "Review food handling procedures and provide appropriate hygiene training."
            );

        }

        else if (foodHandling === "unsafe") {

            riskScore += 4;

            riskFactors.push(
                "Unsafe food handling practices"
            );

            recommendations.push(
                "Improve food handling procedures to reduce contamination risks."
            );
        }


        // =========================================
        // CALCULATE HYGIENE SCORE
        // =========================================

        const maximumRiskScore = 32;

        let hygieneScore =
            Math.round(
                ((maximumRiskScore - riskScore)
                / maximumRiskScore) * 100
            );


        // Make sure score stays between 0 and 100
        hygieneScore =
            Math.max(0, Math.min(100, hygieneScore));


        // =========================================
        // DETERMINE RISK LEVEL
        // =========================================

        let riskLevel = "";

        let resultClass = "";

        let riskIcon = "";

        let riskDescription = "";


        if (riskScore <= 8) {

            riskLevel = "Low Risk";

            resultClass = "low-risk";

            riskIcon = "🟢";

            riskDescription =
                "The simulated conditions indicate a relatively low food hygiene risk. Continue maintaining good hygiene and food safety practices.";

        }

        else if (riskScore <= 18) {

            riskLevel = "Moderate Risk";

            resultClass = "moderate-risk";

            riskIcon = "🟠";

            riskDescription =
                "The simulated conditions indicate a moderate food hygiene risk. Corrective actions should be taken to improve the identified conditions.";

        }

        else {

            riskLevel = "High Risk";

            resultClass = "high-risk";

            riskIcon = "🔴";

            riskDescription =
                "The simulated conditions indicate a high food hygiene risk. Immediate corrective actions should be considered.";
        }


        // =========================================
        // DEFAULT RECOMMENDATION
        // =========================================

        if (recommendations.length === 0) {

            recommendations.push(
                "Continue maintaining good food hygiene and safety practices."
            );
        }


        // =========================================
        // DISPLAY RESULT ON SIMULATION PAGE
        // =========================================

        simulationResult.style.display = "block";

        simulationResult.className =
            `simulation-result ${resultClass}`;


        document.getElementById("riskIcon").textContent =
            riskIcon;


        document.getElementById("riskLevel").textContent =
            riskLevel;


        document.getElementById("riskScore").textContent =
            riskScore;


        document.getElementById("riskDescription").textContent =
            riskDescription;


        // =========================================
        // DISPLAY RECOMMENDATIONS
        // =========================================

        const recommendationList =
            document.getElementById("recommendationList");


        recommendationList.innerHTML = "";


        recommendations.forEach(function (recommendation) {

            const li =
                document.createElement("li");

            li.textContent =
                recommendation;

            recommendationList.appendChild(li);

        });


        // =========================================
        // DISPLAY HYGIENE SCORE
        // =========================================

        const hygieneScoreElement =
            document.getElementById("hygieneScore");


        if (hygieneScoreElement) {

            hygieneScoreElement.textContent =
                hygieneScore + "%";

        }


        // =========================================
        // DISPLAY RISK FACTORS
        // =========================================

        const riskFactorsElement =
            document.getElementById("riskFactors");


        if (riskFactorsElement) {

            riskFactorsElement.innerHTML = "";


            if (riskFactors.length === 0) {

                const li =
                    document.createElement("li");

                li.textContent =
                    "No major risk factors detected.";

                riskFactorsElement.appendChild(li);

            }

            else {

                riskFactors.forEach(function (factor) {

                    const li =
                        document.createElement("li");

                    li.textContent =
                        factor;

                    riskFactorsElement.appendChild(li);

                });

            }

        }


        // =========================================
        // SAVE COMPLETE SIMULATION DATA
        // =========================================

        const simulationData = {

            hygieneScore: hygieneScore,

            riskScore: riskScore,

            riskLevel: riskLevel,

            riskDescription: riskDescription,

            riskFactors: riskFactors,

            temperature: temperature,

            handHygiene: handHygiene,

            crossContamination:
                crossContamination,

            waterQuality:
                waterQuality,

            cleaning: cleaning,

            pestControl: pestControl,

            wasteManagement:
                wasteManagement,

            foodHandling:
                foodHandling,

            recommendations:
                recommendations,

            date:
                new Date().toLocaleString()

        };


        localStorage.setItem(
            "foodHygieneSimulation",
            JSON.stringify(simulationData)
        );


        // =========================================
        // GO TO RESULTS PAGE
        // =========================================

        const resultsButton =
            document.getElementById("viewResultsBtn");


        if (resultsButton) {

            resultsButton.style.display =
                "inline-block";


            resultsButton.onclick =
                function () {

                    window.location.href =
                        "results.html";

                };

        }


        // Scroll to result
        simulationResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    // =========================================
    // RESET SIMULATION
    // =========================================

    simulationForm.addEventListener(
        "reset",
        function () {

            simulationResult.style.display =
                "none";

            localStorage.removeItem(
                "foodHygieneSimulation"
            );

        }
    );

}
// =========================================
// FOOD HYGIENE RESULTS JAVASCRIPT
// =========================================


// =========================================
// LOAD RESULTS
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // Get saved simulation data
    const savedData =
        localStorage.getItem("foodHygieneSimulation");


    // If there is no simulation result
    if (!savedData) {

        showNoResults();

        setupButtons();

        return;
    }


    // Convert JSON data into JavaScript object
    const data =
        JSON.parse(savedData);


    // Display the simulation result
    displayResults(data);


    // Display the simulated conditions
    displayConditions(data);


    // Display risk factors
    displayRiskFactors(data);


    // Display recommendations
    displayRecommendations(data);


    // Display simulation date
    displayDate(data);


    // Setup buttons
    setupButtons();

});



// =========================================
// DISPLAY MAIN RESULTS
// =========================================

function displayResults(data) {

    const score =
        data.hygieneScore ?? 0;

    const riskScore =
        data.riskScore ?? 0;

    const riskLevel =
        data.riskLevel ?? "Unknown";

    const riskDescription =
        data.riskDescription ??
        "No risk description available.";


    // Hygiene score
    const scoreElement =
        document.getElementById("score");

    if (scoreElement) {

        scoreElement.textContent =
            score + "%";

    }


    // Risk level
    const performanceElement =
        document.getElementById("performance");

    if (performanceElement) {

        if (score >= 80) {

            performanceElement.textContent =
                "Excellent Hygiene Performance";

        }

        else if (score >= 60) {

            performanceElement.textContent =
                "Good Hygiene Performance";

        }

        else {

            performanceElement.textContent =
                "Needs Improvement";

        }

    }


    // Score message
    const messageElement =
        document.getElementById("scoreMessage");

    if (messageElement) {

        messageElement.textContent =
            riskDescription;

    }


    // Risk level
    const riskLevelElement =
        document.getElementById("riskLevel");

    if (riskLevelElement) {

        riskLevelElement.textContent =
            riskLevel;

    }


    // Risk score
    const riskScoreElement =
        document.getElementById("riskScore");

    if (riskScoreElement) {

        riskScoreElement.textContent =
            riskScore;

    }


    // Update score circle
    updateScoreCircle(score);

}



// =========================================
// SCORE CIRCLE
// =========================================

function updateScoreCircle(score) {

    const scoreCircle =
        document.querySelector(".score-circle");


    if (!scoreCircle) {
        return;
    }


    // Keep score between 0 and 100
    score =
        Math.max(0, Math.min(100, score));


    // Convert score to degrees
    const degrees =
        score * 3.6;


    // Update circular indicator
    scoreCircle.style.background =
        `conic-gradient(
            #2e7d32 ${degrees}deg,
            #e0e0e0 ${degrees}deg
        )`;

}



// =========================================
// DISPLAY SUMMARY
// =========================================

function displaySummary(data) {

    const totalQuestions = 8;

    let safeConditions = 0;


    // Temperature
    if (data.temperature === "safe") {
        safeConditions++;
    }


    // Hand hygiene
    if (data.handHygiene === "good") {
        safeConditions++;
    }


    // Cross-contamination
    if (data.crossContamination === "controlled") {
        safeConditions++;
    }


    // Water
    if (data.waterQuality === "safe") {
        safeConditions++;
    }


    // Cleaning
    if (data.cleaning === "good") {
        safeConditions++;
    }


    // Pest control
    if (data.pestControl === "controlled") {
        safeConditions++;
    }


    // Waste management
    if (data.wasteManagement === "good") {
        safeConditions++;
    }


    // Food handling
    if (data.foodHandling === "safe") {
        safeConditions++;
    }


    const riskConditions =
        totalQuestions - safeConditions;


    // Total
    const totalElement =
        document.getElementById("totalQuestions");

    if (totalElement) {

        totalElement.textContent =
            totalQuestions;

    }


    // Safe
    const correctElement =
        document.getElementById("correctAnswers");

    if (correctElement) {

        correctElement.textContent =
            safeConditions;

    }


    // Risk
    const incorrectElement =
        document.getElementById("incorrectAnswers");

    if (incorrectElement) {

        incorrectElement.textContent =
            riskConditions;

    }


    // Risk level
    const riskElement =
        document.getElementById("riskLevel");

    if (riskElement) {

        riskElement.textContent =
            data.riskLevel || "Unknown";

    }

}



// =========================================
// DISPLAY SIMULATED CONDITIONS
// =========================================

function displayConditions(data) {

    const conditionContainer =
        document.getElementById("simulationConditions");


    // This section is optional
    if (!conditionContainer) {
        return;
    }


    conditionContainer.innerHTML = "";


    const conditions = [

        {
            name: "Food Storage Temperature",
            value: data.temperature
        },

        {
            name: "Hand Hygiene",
            value: data.handHygiene
        },

        {
            name: "Cross-Contamination",
            value: data.crossContamination
        },

        {
            name: "Water Quality",
            value: data.waterQuality
        },

        {
            name: "Cleaning and Sanitation",
            value: data.cleaning
        },

        {
            name: "Pest Control",
            value: data.pestControl
        },

        {
            name: "Waste Management",
            value: data.wasteManagement
        },

        {
            name: "Food Handling",
            value: data.foodHandling
        }

    ];


    conditions.forEach(function (condition) {

        const item =
            document.createElement("div");


        item.classList.add(
            "condition-item"
        );


        const title =
            document.createElement("strong");

        title.textContent =
            condition.name;


        const value =
            document.createElement("span");

        value.textContent =
            formatCondition(condition.value);


        item.appendChild(title);

        item.appendChild(value);


        conditionContainer.appendChild(item);

    });

}



// =========================================
// FORMAT CONDITION TEXT
// =========================================

function formatCondition(value) {

    if (!value) {
        return "Not available";
    }


    const words =
        value.split(" ");


    return words
        .map(function (word) {

            return word.charAt(0).toUpperCase()
                + word.slice(1);

        })
        .join(" ");

}



// =========================================
// DISPLAY RISK FACTORS
// =========================================

function displayRiskFactors(data) {

    const container =
        document.getElementById("riskFactors");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const factors =
        data.riskFactors || [];


    if (factors.length === 0) {

        const li =
            document.createElement("li");

        li.textContent =
            "No major risk factors were identified.";

        container.appendChild(li);

        return;
    }


    factors.forEach(function (factor) {

        const li =
            document.createElement("li");

        li.textContent =
            factor;

        container.appendChild(li);

    });

}



// =========================================
// DISPLAY RECOMMENDATIONS
// =========================================

function displayRecommendations(data) {

    const container =
        document.getElementById("recommendations");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const recommendations =
        data.recommendations || [];


    if (recommendations.length === 0) {

        const p =
            document.createElement("p");

        p.textContent =
            "Continue maintaining good food hygiene practices.";

        container.appendChild(p);

        return;
    }


    recommendations.forEach(function (recommendation) {

        const item =
            document.createElement("div");


        item.classList.add(
            "recommendation-item"
        );


        item.textContent =
            recommendation;


        container.appendChild(item);

    });

}



// =========================================
// DISPLAY SIMULATION DATE
// =========================================

function displayDate(data) {

    const dateElement =
        document.getElementById("simulationDate");


    if (!dateElement) {
        return;
    }


    if (data.date) {

        dateElement.textContent =
            "Simulation Date: " + data.date;

    }

}



// =========================================
// NO RESULTS
// =========================================

function showNoResults() {

    const score =
        document.getElementById("score");

    if (score) {
        score.textContent = "0%";
    }


    const performance =
        document.getElementById("performance");

    if (performance) {

        performance.textContent =
            "No Result Available";

    }


    const message =
        document.getElementById("scoreMessage");

    if (message) {

        message.textContent =
            "Please complete the food hygiene simulation first.";

    }


    const total =
        document.getElementById("totalQuestions");

    if (total) {
        total.textContent = "0";
    }


    const correct =
        document.getElementById("correctAnswers");

    if (correct) {
        correct.textContent = "0";
    }


    const incorrect =
        document.getElementById("incorrectAnswers");

    if (incorrect) {
        incorrect.textContent = "0";
    }


    const risk =
        document.getElementById("riskLevel");

    if (risk) {
        risk.textContent = "Unknown";
    }


    const recommendations =
        document.getElementById("recommendations");

    if (recommendations) {

        recommendations.innerHTML =
            "<p>Please complete the simulation to receive recommendations.</p>";

    }

}



// =========================================
// BUTTONS
// =========================================

function setupButtons() {


    // =========================================
    // TAKE SIMULATION AGAIN
    // =========================================

    const retryBtn =
        document.getElementById("retryBtn");


    if (retryBtn) {

        retryBtn.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "foodHygieneSimulation"
                );


                window.location.href =
                    "simulation.html";

            }
        );

    }



    // =========================================
    // GO TO ASSESSMENT
    // =========================================

    const assessmentBtn =
        document.getElementById("assessmentBtn");


    if (assessmentBtn) {

        assessmentBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "assessment.html";

            }
        );

    }



    // =========================================
    // GO TO DASHBOARD
    // =========================================

    const dashboardBtn =
        document.getElementById("dashboardBtn");


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );

    }



    // =========================================
    // LOGOUT
    // =========================================

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "loggedInUser"
                );


                window.location.href =
                    "login.html";

            }
        );

    }

}

/* =========================================================
   FOOD HYGIENE MANAGEMENT SYSTEM
   RESULTS.JS
   ========================================================= */


/* =========================================================
   RUN WHEN PAGE LOADS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadSimulationResults();

    setupResultButtons();

});


/* =========================================================
   LOAD SIMULATION RESULTS
   ========================================================= */

function loadSimulationResults() {

    const savedData = localStorage.getItem("foodHygieneSimulation");


    // Check whether simulation data exists

    if (!savedData) {

        showNoResults();

        return;

    }


    try {

        const data = JSON.parse(savedData);

        displayResults(data);

    }

    catch (error) {

        console.error(
            "Error reading simulation results:",
            error
        );

        showNoResults();

    }

}


/* =========================================================
   DISPLAY RESULTS
   ========================================================= */

function displayResults(data) {

    /* -----------------------------------------
       OVERALL SCORE
       ----------------------------------------- */

    const score = Number(data.hygieneScore) || 0;

    const scoreElement =
        document.getElementById("score");

    if (scoreElement) {

        scoreElement.textContent =
            Math.round(score) + "%";

    }


    /* -----------------------------------------
       PERFORMANCE LEVEL
       ----------------------------------------- */

    const performanceElement =
        document.getElementById("performance");

    const scoreMessageElement =
        document.getElementById("scoreMessage");


    let performance = "";
    let message = "";


    if (score >= 80) {

        performance = "Excellent Hygiene Performance";

        message =
            "The simulated food handling conditions show a good level of food hygiene. Continue maintaining safe food handling and sanitation practices.";

    }

    else if (score >= 60) {

        performance = "Moderate Hygiene Performance";

        message =
            "The simulation indicates some areas require improvement. Correct the identified risks to improve food safety.";

    }

    else {

        performance = "Poor Hygiene Performance";

        message =
            "The simulation indicates significant food hygiene risks. Immediate corrective actions are recommended.";

    }


    if (performanceElement) {

        performanceElement.textContent =
            performance;

    }


    if (scoreMessageElement) {

        scoreMessageElement.textContent =
            message;

    }


    /* -----------------------------------------
       RISK SCORE
       ----------------------------------------- */

    const riskScore =
        Number(data.riskScore) || 0;


    const riskScoreElement =
        document.getElementById("riskScore");


    if (riskScoreElement) {

        riskScoreElement.textContent =
            riskScore;

    }


    /* -----------------------------------------
       RISK LEVEL
       ----------------------------------------- */

    const riskLevel =
        data.riskLevel || "Unknown";


    const riskLevelElement =
        document.getElementById("riskLevel");


    if (riskLevelElement) {

        riskLevelElement.textContent =
            riskLevel;

    }


    /* -----------------------------------------
       RISK DESCRIPTION
       ----------------------------------------- */

    const descriptionElement =
        document.getElementById("riskDescription");


    if (descriptionElement) {

        descriptionElement.textContent =
            data.riskDescription ||
            "No risk description is available.";

    }


    /* -----------------------------------------
       SUMMARY
       ----------------------------------------- */

    calculateSummary(data);


    /* -----------------------------------------
       HYGIENE AREA PERFORMANCE
       ----------------------------------------- */

    calculateHygieneAreas(data);


    /* -----------------------------------------
       RISK FACTORS
       ----------------------------------------- */

    displayRiskFactors(data);


    /* -----------------------------------------
       RECOMMENDATIONS
       ----------------------------------------- */

    displayRecommendations(data);


    /* -----------------------------------------
       SIMULATION DATE
       ----------------------------------------- */

    displaySimulationDate(data);


    /* -----------------------------------------
       RISK STYLE
       ----------------------------------------- */

    applyRiskStyle(riskLevel);

}


/* =========================================================
   CALCULATE SIMULATION SUMMARY
   ========================================================= */

function calculateSummary(data) {

    const conditions = [

        data.temperature,

        data.handHygiene,

        data.crossContamination,

        data.waterQuality,

        data.cleaning,

        data.pestControl,

        data.wasteManagement,

        data.foodHandling

    ];


    const validConditions =
        conditions.filter(
            condition => condition !== undefined &&
                          condition !== null &&
                          condition !== ""
        );


    const total =
        validConditions.length;


    let safe = 0;


    validConditions.forEach(function (condition) {

        if (
            condition === "safe" ||
            condition === "good" ||
            condition === "controlled"
        ) {

            safe++;

        }

    });


    const risk =
        total - safe;


    const totalElement =
        document.getElementById("totalQuestions");


    const correctElement =
        document.getElementById("correctAnswers");


    const incorrectElement =
        document.getElementById("incorrectAnswers");


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (correctElement) {

        correctElement.textContent =
            safe;

    }


    if (incorrectElement) {

        incorrectElement.textContent =
            risk;

    }

}


/* =========================================================
   HYGIENE AREA PERFORMANCE
   ========================================================= */

function calculateHygieneAreas(data) {


    /* -----------------------------------------
       PERSONAL HYGIENE
       ----------------------------------------- */

    let personalScore = 0;


    if (data.handHygiene === "good") {

        personalScore = 100;

    }

    else if (data.handHygiene === "poor") {

        personalScore = 40;

    }


    const personalElement =
        document.getElementById("personalHygiene");


    if (personalElement) {

        personalElement.textContent =
            personalScore + "%";

    }


    /* -----------------------------------------
       FOOD HANDLING
       ----------------------------------------- */

    let handlingScore = 0;


    if (data.foodHandling === "safe") {

        handlingScore = 100;

    }

    else if (data.foodHandling === "moderate") {

        handlingScore = 70;

    }

    else if (data.foodHandling === "unsafe") {

        handlingScore = 30;

    }


    const handlingElement =
        document.getElementById("foodHandling");


    if (handlingElement) {

        handlingElement.textContent =
            handlingScore + "%";

    }


    /* -----------------------------------------
       FOOD STORAGE
       ----------------------------------------- */

    let storageScore = 0;


    if (data.temperature === "safe") {

        storageScore = 100;

    }

    else if (data.temperature === "moderate") {

        storageScore = 70;

    }

    else if (data.temperature === "unsafe") {

        storageScore = 30;

    }


    const storageElement =
        document.getElementById("foodStorage");


    if (storageElement) {

        storageElement.textContent =
            storageScore + "%";

    }


    /* -----------------------------------------
       CLEANING AND SANITATION
       ----------------------------------------- */

    let cleaningScore = 0;


    if (data.cleaning === "good") {

        cleaningScore = 100;

    }

    else if (data.cleaning === "moderate") {

        cleaningScore = 70;

    }

    else if (data.cleaning === "poor") {

        cleaningScore = 30;

    }


    const cleaningElement =
        document.getElementById("cleaning");


    if (cleaningElement) {

        cleaningElement.textContent =
            cleaningScore + "%";

    }

}


/* =========================================================
   DISPLAY RISK FACTORS
   ========================================================= */

function displayRiskFactors(data) {

    const container =
        document.getElementById("riskFactors");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let factors = [];


    /* Temperature */

    if (data.temperature === "unsafe") {

        factors.push(
            "Unsafe food storage temperature."
        );

    }

    else if (data.temperature === "moderate") {

        factors.push(
            "Food storage temperature requires monitoring."
        );

    }


    /* Hand hygiene */

    if (data.handHygiene === "poor") {

        factors.push(
            "Poor hand hygiene may increase contamination risk."
        );

    }


    /* Cross contamination */

    if (data.crossContamination === "possible") {

        factors.push(
            "Possible cross-contamination was identified."
        );

    }

    else if (data.crossContamination === "high") {

        factors.push(
            "High cross-contamination risk was identified."
        );

    }


    /* Water */

    if (data.waterQuality === "uncertain") {

        factors.push(
            "Water quality is uncertain and should be verified."
        );

    }

    else if (data.waterQuality === "unsafe") {

        factors.push(
            "Unsafe water condition may contribute to food contamination."
        );

    }


    /* Cleaning */

    if (data.cleaning === "moderate") {

        factors.push(
            "Cleaning and sanitation require improvement."
        );

    }

    else if (data.cleaning === "poor") {

        factors.push(
            "Poor cleaning and sanitation may increase contamination risk."
        );

    }


    /* Pest control */

    if (data.pestControl === "possible") {

        factors.push(
            "Possible pest presence was identified."
        );

    }

    else if (data.pestControl === "present") {

        factors.push(
            "Pest presence was detected."
        );

    }


    /* Waste */

    if (data.wasteManagement === "moderate") {

        factors.push(
            "Waste management requires improvement."
        );

    }

    else if (data.wasteManagement === "poor") {

        factors.push(
            "Poor waste management may increase hygiene risk."
        );

    }


    /* Food handling */

    if (data.foodHandling === "moderate") {

        factors.push(
            "Food handling practices require improvement."
        );

    }

    else if (data.foodHandling === "unsafe") {

        factors.push(
            "Unsafe food handling practices were identified."
        );

    }


    /* No risks */

    if (factors.length === 0) {

        factors.push(
            "No major hygiene risk factors were identified in the simulation."
        );

    }


    factors.forEach(function (factor) {

        const li =
            document.createElement("li");

        li.textContent = factor;

        container.appendChild(li);

    });

}


/* =========================================================
   DISPLAY RECOMMENDATIONS
   ========================================================= */

function displayRecommendations(data) {

    const container =
        document.getElementById("recommendations");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let recommendations =
        data.recommendations || [];


    /*
       Make sure recommendations
       are always treated as an array.
    */

    if (!Array.isArray(recommendations)) {

        recommendations =
            [recommendations];

    }


    if (recommendations.length === 0) {

        recommendations.push(
            "Continue maintaining good food hygiene practices."
        );

    }


    recommendations.forEach(function (recommendation) {

        const item =
            document.createElement("div");


        item.className =
            "recommendation-item";


        item.textContent =
            "✓ " + recommendation;


        container.appendChild(item);

    });

}


/* =========================================================
   DISPLAY SIMULATION DATE
   ========================================================= */

function displaySimulationDate(data) {

    const dateElement =
        document.getElementById("simulationDate");


    if (!dateElement) {

        return;

    }


    if (data.date) {

        const date =
            new Date(data.date);


        if (!isNaN(date.getTime())) {

            dateElement.textContent =
                date.toLocaleString();

            return;

        }

    }


    dateElement.textContent =
        "Not available";

}


/* =========================================================
   APPLY RISK STYLE
   ========================================================= */

function applyRiskStyle(riskLevel) {

    const riskElement =
        document.getElementById("riskLevel");


    if (!riskElement) {

        return;

    }


    riskElement.classList.remove(
        "low-risk",
        "moderate-risk",
        "high-risk"
    );


    const level =
        String(riskLevel).toLowerCase();


    if (
        level.includes("low")
    ) {

        riskElement.classList.add(
            "low-risk"
        );

    }

    else if (
        level.includes("moderate") ||
        level.includes("medium")
    ) {

        riskElement.classList.add(
            "moderate-risk"
        );

    }

    else if (
        level.includes("high")
    ) {

        riskElement.classList.add(
            "high-risk"
        );

    }

}


/* =========================================================
   NO RESULTS
   ========================================================= */

function showNoResults() {

    const score =
        document.getElementById("score");

    const performance =
        document.getElementById("performance");

    const message =
        document.getElementById("scoreMessage");


    if (score) {

        score.textContent = "0%";

    }


    if (performance) {

        performance.textContent =
            "No Result Available";

    }


    if (message) {

        message.textContent =
            "Please complete the Food Hygiene Simulation first to generate results.";

    }


    const riskLevel =
        document.getElementById("riskLevel");


    if (riskLevel) {

        riskLevel.textContent =
            "Unknown";

    }


    const riskScore =
        document.getElementById("riskScore");


    if (riskScore) {

        riskScore.textContent =
            "0";

    }


    const riskDescription =
        document.getElementById("riskDescription");


    if (riskDescription) {

        riskDescription.textContent =
            "No simulation has been completed.";

    }

}


/* =========================================================
   RESULT BUTTONS
   ========================================================= */

function setupResultButtons() {


    /* -----------------------------------------
       TAKE SIMULATION AGAIN
       ----------------------------------------- */

    const retryBtn =
        document.getElementById("retryBtn");


    if (retryBtn) {

        retryBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "simulation.html";

            }
        );

    }


    /* -----------------------------------------
       GO TO ASSESSMENT
       ----------------------------------------- */

    const assessmentBtn =
        document.getElementById("assessmentBtn");


    if (assessmentBtn) {

        assessmentBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "assessment.html";

            }
        );

    }


    /* -----------------------------------------
       GO TO DASHBOARD
       ----------------------------------------- */

    const dashboardBtn =
        document.getElementById("dashboardBtn");


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );

    }

}

/* =========================================================
   FOOD HYGIENE MANAGEMENT SYSTEM
   PROFILE.JS
   ========================================================= */


/* =========================================================
   RUN WHEN PAGE LOADS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadProfile();

    loadActivity();

    setupProfileEditing();

    setupPasswordChange();

    setupLogout();

});


/* =========================================================
   DEFAULT PROFILE DATA
   ========================================================= */

const defaultProfile = {

    fullName: "Administrator",

    username: "admin",

    email: "admin@foodhygiene.com",

    phone: "+255 000 000 000",

    role: "Food Hygiene Officer",

    accountStatus: "Active",

    accountCreated: "2026"

};


/* =========================================================
   LOAD PROFILE
   ========================================================= */

function loadProfile() {

    const savedProfile =
        localStorage.getItem("foodHygieneProfile");


    let profile;


    if (savedProfile) {

        try {

            profile =
                JSON.parse(savedProfile);

        }

        catch (error) {

            console.error(
                "Unable to load profile:",
                error
            );

            profile =
                defaultProfile;

        }

    }

    else {

        profile =
            defaultProfile;

    }


    /* -----------------------------------------
       DISPLAY PROFILE
       ----------------------------------------- */

    const fullName =
        document.getElementById("fullName");

    const username =
        document.getElementById("username");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const role =
        document.getElementById("role");

    const accountStatus =
        document.getElementById("accountStatus");

    const profileName =
        document.getElementById("profileName");

    const profileRole =
        document.getElementById("profileRole");

    const accountCreated =
        document.getElementById("accountCreated");


    if (fullName) {

        fullName.value =
            profile.fullName;

    }


    if (username) {

        username.value =
            profile.username;

    }


    if (email) {

        email.value =
            profile.email;

    }


    if (phone) {

        phone.value =
            profile.phone;

    }


    if (role) {

        role.value =
            profile.role;

    }


    if (accountStatus) {

        accountStatus.value =
            profile.accountStatus;

    }


    if (profileName) {

        profileName.textContent =
            profile.fullName;

    }


    if (profileRole) {

        profileRole.textContent =
            profile.role;

    }


    if (accountCreated) {

        accountCreated.textContent =
            profile.accountCreated;

    }

}


/* =========================================================
   PROFILE EDITING
   ========================================================= */

function setupProfileEditing() {

    const editBtn =
        document.getElementById("editProfileBtn");

    const saveBtn =
        document.getElementById("saveProfileBtn");

    const cancelBtn =
        document.getElementById("cancelProfileBtn");


    const editableFields = [

        document.getElementById("fullName"),

        document.getElementById("username"),

        document.getElementById("email"),

        document.getElementById("phone")

    ];


    /* -----------------------------------------
       EDIT PROFILE
       ----------------------------------------- */

    if (editBtn) {

        editBtn.addEventListener(
            "click",
            function () {

                editableFields.forEach(
                    function (field) {

                        if (field) {

                            field.removeAttribute(
                                "readonly"
                            );

                            field.classList.add(
                                "editable"
                            );

                        }

                    }
                );


                editBtn.style.display =
                    "none";


                if (saveBtn) {

                    saveBtn.style.display =
                        "inline-block";

                }


                if (cancelBtn) {

                    cancelBtn.style.display =
                        "inline-block";

                }

            }
        );

    }


    /* -----------------------------------------
       SAVE PROFILE
       ----------------------------------------- */

    if (saveBtn) {

        saveBtn.addEventListener(
            "click",
            function () {

                saveProfile();

            }
        );

    }


    /* -----------------------------------------
       CANCEL EDITING
       ----------------------------------------- */

    if (cancelBtn) {

        cancelBtn.addEventListener(
            "click",
            function () {

                loadProfile();

                disableProfileEditing();

            }
        );

    }

}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

function saveProfile() {

    const fullName =
        document.getElementById("fullName");

    const username =
        document.getElementById("username");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");


    /* -----------------------------------------
       VALIDATION
       ----------------------------------------- */

    if (
        !fullName.value.trim() ||
        !username.value.trim() ||
        !email.value.trim() ||
        !phone.value.trim()
    ) {

        alert(
            "Please complete all profile fields."
        );

        return;

    }


    /* -----------------------------------------
       VALIDATE EMAIL
       ----------------------------------------- */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email.value)) {

        alert(
            "Please enter a valid email address."
        );

        return;

    }


    /* -----------------------------------------
       GET EXISTING PROFILE
       ----------------------------------------- */

    const savedProfile =
        localStorage.getItem(
            "foodHygieneProfile"
        );


    let oldProfile;


    if (savedProfile) {

        try {

            oldProfile =
                JSON.parse(savedProfile);

        }

        catch (error) {

            oldProfile =
                defaultProfile;

        }

    }

    else {

        oldProfile =
            defaultProfile;

    }


    /* -----------------------------------------
       CREATE UPDATED PROFILE
       ----------------------------------------- */

    const updatedProfile = {

        fullName:
            fullName.value.trim(),

        username:
            username.value.trim(),

        email:
            email.value.trim(),

        phone:
            phone.value.trim(),

        role:
            oldProfile.role,

        accountStatus:
            oldProfile.accountStatus,

        accountCreated:
            oldProfile.accountCreated

    };


    /* -----------------------------------------
       SAVE TO LOCAL STORAGE
       ----------------------------------------- */

    localStorage.setItem(

        "foodHygieneProfile",

        JSON.stringify(updatedProfile)

    );


    /* -----------------------------------------
       UPDATE PAGE
       ----------------------------------------- */

    const profileName =
        document.getElementById("profileName");

    const profileRole =
        document.getElementById("profileRole");


    if (profileName) {

        profileName.textContent =
            updatedProfile.fullName;

    }


    if (profileRole) {

        profileRole.textContent =
            updatedProfile.role;

    }


    disableProfileEditing();


    alert(
        "Profile information saved successfully."
    );

}


/* =========================================================
   DISABLE PROFILE EDITING
   ========================================================= */

function disableProfileEditing() {

    const editBtn =
        document.getElementById("editProfileBtn");

    const saveBtn =
        document.getElementById("saveProfileBtn");

    const cancelBtn =
        document.getElementById("cancelProfileBtn");


    const fields = [

        document.getElementById("fullName"),

        document.getElementById("username"),

        document.getElementById("email"),

        document.getElementById("phone")

    ];


    fields.forEach(
        function (field) {

            if (field) {

                field.setAttribute(
                    "readonly",
                    true
                );

                field.classList.remove(
                    "editable"
                );

            }

        }
    );


    if (editBtn) {

        editBtn.style.display =
            "inline-block";

    }


    if (saveBtn) {

        saveBtn.style.display =
            "none";

    }


    if (cancelBtn) {

        cancelBtn.style.display =
            "none";

    }

}


/* =========================================================
   LOAD SYSTEM ACTIVITY
   ========================================================= */

function loadActivity() {

    const simulationCountElement =
        document.getElementById(
            "simulationCount"
        );


    const assessmentCountElement =
        document.getElementById(
            "assessmentCount"
        );


    const reportCountElement =
        document.getElementById(
            "reportCount"
        );


    /* -----------------------------------------
       SIMULATION COUNT
       ----------------------------------------- */

    let simulationCount = 0;


    const simulationData =
        localStorage.getItem(
            "foodHygieneSimulation"
        );


    if (simulationData) {

        simulationCount = 1;

    }


    /* -----------------------------------------
       ASSESSMENT COUNT
       ----------------------------------------- */

    let assessmentCount = 0;


    const assessmentData =
        localStorage.getItem(
            "foodHygieneAssessment"
        );


    if (assessmentData) {

        assessmentCount = 1;

    }


    /* -----------------------------------------
       REPORT COUNT
       ----------------------------------------- */

    let reportCount = 0;


    const reportData =
        localStorage.getItem(
            "foodHygieneReport"
        );


    if (reportData) {

        reportCount = 1;

    }


    /* -----------------------------------------
       DISPLAY COUNTS
       ----------------------------------------- */

    if (simulationCountElement) {

        simulationCountElement.textContent =
            simulationCount;

    }


    if (assessmentCountElement) {

        assessmentCountElement.textContent =
            assessmentCount;

    }


    if (reportCountElement) {

        reportCountElement.textContent =
            reportCount;

    }

}


/* =========================================================
   PASSWORD CHANGE
   ========================================================= */

function setupPasswordChange() {

    const changePasswordBtn =
        document.getElementById(
            "changePasswordBtn"
        );


    const passwordSection =
        document.getElementById(
            "passwordSection"
        );


    const cancelPasswordBtn =
        document.getElementById(
            "cancelPasswordBtn"
        );


    const passwordForm =
        document.getElementById(
            "passwordForm"
        );


    /* -----------------------------------------
       OPEN PASSWORD FORM
       ----------------------------------------- */

    if (changePasswordBtn) {

        changePasswordBtn.addEventListener(
            "click",
            function () {

                if (passwordSection) {

                    passwordSection.style.display =
                        "block";

                    passwordSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* -----------------------------------------
       CANCEL PASSWORD
       ----------------------------------------- */

    if (cancelPasswordBtn) {

        cancelPasswordBtn.addEventListener(
            "click",
            function () {

                if (passwordSection) {

                    passwordSection.style.display =
                        "none";

                }


                if (passwordForm) {

                    passwordForm.reset();

                }

            }
        );

    }


    /* -----------------------------------------
       SUBMIT PASSWORD
       ----------------------------------------- */

    if (passwordForm) {

        passwordForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                changePassword();

            }
        );

    }

}


/* =========================================================
   CHANGE PASSWORD
   ========================================================= */

function changePassword() {

    const currentPassword =
        document.getElementById(
            "currentPassword"
        ).value;


    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    /* -----------------------------------------
       CHECK CURRENT PASSWORD
       ----------------------------------------- */

    if (!currentPassword) {

        alert(
            "Please enter your current password."
        );

        return;

    }


    /* -----------------------------------------
       CHECK NEW PASSWORD
       ----------------------------------------- */

    if (newPassword.length < 6) {

        alert(
            "New password must contain at least 6 characters."
        );

        return;

    }


    /* -----------------------------------------
       CONFIRM PASSWORD
       ----------------------------------------- */

    if (newPassword !== confirmPassword) {

        alert(
            "New passwords do not match."
        );

        return;

    }


    /*
       NOTE:
       This is frontend-only password simulation.
       Real password authentication should be handled
       by PHP/MySQL on the backend.
    */

    localStorage.setItem(
        "foodHygienePassword",
        newPassword
    );


    alert(
        "Password changed successfully."
    );


    const passwordForm =
        document.getElementById(
            "passwordForm"
        );


    const passwordSection =
        document.getElementById(
            "passwordSection"
        );


    if (passwordForm) {

        passwordForm.reset();

    }


    if (passwordSection) {

        passwordSection.style.display =
            "none";

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function setupLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    const logoutProfileBtn =
        document.getElementById(
            "logoutProfileBtn"
        );


    /* -----------------------------------------
       HEADER LOGOUT
       ----------------------------------------- */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }


    /* -----------------------------------------
       PROFILE LOGOUT
       ----------------------------------------- */

    if (logoutProfileBtn) {

        logoutProfileBtn.addEventListener(
            "click",
            logoutUser
        );

    }

}


/* =========================================================
   LOGOUT FUNCTION
   ========================================================= */

function logoutUser() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    /*
       Remove login session.
       Keep profile and simulation data.
    */

    localStorage.removeItem(
        "loggedInUser"
    );


    localStorage.removeItem(
        "isLoggedIn"
    );


    /*
       Redirect to login page.
    */

    window.location.href =
        "login.html";

}
 

