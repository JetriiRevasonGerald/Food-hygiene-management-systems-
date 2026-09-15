/* =========================================================
   FOOD HYGIENE MANAGEMENT SYSTEM
   REPORTS.JS
   ========================================================= */


/* =========================================================
   RUN WHEN REPORT PAGE LOADS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadReport();

    setupReportButtons();

});


/* =========================================================
   LOAD REPORT DATA
   ========================================================= */

/*function loadReport() {

    const savedData =
        localStorage.getItem("foodHygieneSimulation");


     -----------------------------------------
       CHECK IF SIMULATION EXISTS
       ----------------------------------------- 

    if (!savedData) {

        showNoReport();

        return;

    }


    let data;


    try {

        data = JSON.parse(savedData);

    }

    catch (error) {

        console.error(
            "Error reading simulation data:",
            error
        );

        showNoReport();

        return;

    }


     -----------------------------------------
       DISPLAY REPORT
       ----------------------------------------- 

    displayReportInformation(data);

    displayOverallPerformance(data);

    displayAssessmentSummary(data);

    displayHygieneAreas(data);

    displayRiskFactors(data);

    displayRecommendations(data);

    displayFinalSummary(data);

}*/
function loadReport() {

    const savedData = localStorage.getItem("foodHygieneSimulation");

    /* -----------------------------------------
       CHECK IF SIMULATION EXISTS
       ----------------------------------------- */
    if (!savedData) {
        showNoReport();
        return;
    }

    let data;

    try {
        data = JSON.parse(savedData);
        
        // Automatically save report status when loaded
        localStorage.setItem("foodHygieneReport", savedData);
    }
    catch (error) {
        console.error("Error reading simulation data:", error);
        showNoReport();
        return;
    }

    /* -----------------------------------------
       DISPLAY REPORT
       ----------------------------------------- */
    displayReportInformation(data);
    displayOverallPerformance(data);
    displayAssessmentSummary(data);
    displayHygieneAreas(data);
    displayRiskFactors(data);
    displayRecommendations(data);
    displayFinalSummary(data);
}

/* =========================================================
   REPORT INFORMATION
   ========================================================= */

function displayReportInformation(data) {

    const reportDate =
        document.getElementById("reportDate");


    const reportUser =
        document.getElementById("reportUser");


    if (reportDate) {

        reportDate.textContent =
            data.date || new Date().toLocaleString();

    }


    if (reportUser) {

        reportUser.textContent =
            "Administrator";

    }

}


/* =========================================================
   OVERALL PERFORMANCE
   ========================================================= */

function displayOverallPerformance(data) {

    const hygieneScore =
        Number(data.hygieneScore) || 0;


    const riskScore =
        Number(data.riskScore) || 0;


    const riskLevel =
        data.riskLevel || "Unknown";


    /* -----------------------------------------
       HYGIENE SCORE
       ----------------------------------------- */

    const scoreElement =
        document.getElementById("reportScore");


    if (scoreElement) {

        scoreElement.textContent =
            hygieneScore + "%";

    }


    /* -----------------------------------------
       PERFORMANCE LEVEL
       ----------------------------------------- */

    const performanceElement =
        document.getElementById(
            "reportPerformance"
        );


    let performance;


    if (hygieneScore >= 80) {

        performance =
            "Excellent Hygiene Performance";

    }

    else if (hygieneScore >= 60) {

        performance =
            "Moderate Hygiene Performance";

    }

    else {

        performance =
            "Poor Hygiene Performance";

    }


    if (performanceElement) {

        performanceElement.textContent =
            performance;

    }


    /* -----------------------------------------
       RISK LEVEL
       ----------------------------------------- */

    const riskElement =
        document.getElementById("reportRisk");


    if (riskElement) {

        riskElement.textContent =
            riskLevel;

    }


    /* -----------------------------------------
       RISK SCORE
       ----------------------------------------- */

    const riskScoreElement =
        document.getElementById(
            "reportRiskScore"
        );


    if (riskScoreElement) {

        riskScoreElement.textContent =
            riskScore;

    }

}


/* =========================================================
   ASSESSMENT SUMMARY
   ========================================================= */

function displayAssessmentSummary(data) {

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


    /* -----------------------------------------
       REMOVE EMPTY CONDITIONS
       ----------------------------------------- */

    const validConditions =
        conditions.filter(function (condition) {

            return (
                condition !== undefined &&
                condition !== null &&
                condition !== ""
            );

        });


    const total =
        validConditions.length;


    /* -----------------------------------------
       COUNT SAFE CONDITIONS
       ----------------------------------------- */

    let safe = 0;


    validConditions.forEach(
        function (condition) {

            if (

                condition === "safe" ||

                condition === "good" ||

                condition === "controlled"

            ) {

                safe++;

            }

        }
    );


    /* -----------------------------------------
       INCORRECT / RISK CONDITIONS
       ----------------------------------------- */

    const incorrect =
        total - safe;


    /* -----------------------------------------
       DISPLAY TOTAL
       ----------------------------------------- */

    const totalElement =
        document.getElementById(
            "reportTotalQuestions"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    /* -----------------------------------------
       DISPLAY CORRECT
       ----------------------------------------- */

    const correctElement =
        document.getElementById(
            "reportCorrectAnswers"
        );


    if (correctElement) {

        correctElement.textContent =
            safe;

    }


    /* -----------------------------------------
       DISPLAY INCORRECT
       ----------------------------------------- */

    const incorrectElement =
        document.getElementById(
            "reportIncorrectAnswers"
        );


    if (incorrectElement) {

        incorrectElement.textContent =
            incorrect;

    }


    /* -----------------------------------------
       STATUS
       ----------------------------------------- */

    const statusElement =
        document.getElementById(
            "assessmentStatus"
        );


    if (statusElement) {

        statusElement.textContent =
            total > 0
                ? "Simulation Completed"
                : "Not Completed";

    }

}


/* =========================================================
   HYGIENE AREA PERFORMANCE
   ========================================================= */

function displayHygieneAreas(data) {

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
        document.getElementById(
            "reportPersonalHygiene"
        );


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
        document.getElementById(
            "reportFoodHandling"
        );


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
        document.getElementById(
            "reportFoodStorage"
        );


    if (storageElement) {

        storageElement.textContent =
            storageScore + "%";

    }


    /* -----------------------------------------
       CLEANING & SANITATION
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
        document.getElementById(
            "reportCleaning"
        );


    if (cleaningElement) {

        cleaningElement.textContent =
            cleaningScore + "%";

    }

}


/* =========================================================
   RISK FACTORS
   ========================================================= */

function displayRiskFactors(data) {

    const riskFactorsElement =
        document.getElementById(
            "reportRiskFactors"
        );


    if (!riskFactorsElement) {

        return;

    }


    riskFactorsElement.innerHTML = "";


    const riskFactors =
        Array.isArray(data.riskFactors)
            ? data.riskFactors
            : [];


    /* -----------------------------------------
       NO RISK FACTORS
       ----------------------------------------- */

    if (riskFactors.length === 0) {

        const li =
            document.createElement("li");


        li.textContent =
            "No major risk factors detected.";


        riskFactorsElement.appendChild(li);


        return;

    }


    /* -----------------------------------------
       DISPLAY RISK FACTORS
       ----------------------------------------- */

    riskFactors.forEach(
        function (factor) {

            const li =
                document.createElement("li");


            li.textContent =
                factor;


            riskFactorsElement.appendChild(li);

        }
    );

}


/* =========================================================
   RECOMMENDATIONS
   ========================================================= */

function displayRecommendations(data) {

    const recommendationsElement =
        document.getElementById(
            "reportRecommendations"
        );


    if (!recommendationsElement) {

        return;

    }


    recommendationsElement.innerHTML = "";


    const recommendations =
        Array.isArray(data.recommendations)
            ? data.recommendations
            : [];


    /* -----------------------------------------
       NO RECOMMENDATIONS
       ----------------------------------------- */

    if (recommendations.length === 0) {

        const paragraph =
            document.createElement("p");


        paragraph.textContent =
            "Continue maintaining good food hygiene and safety practices.";


        recommendationsElement.appendChild(
            paragraph
        );


        return;

    }


    /* -----------------------------------------
       CREATE LIST
       ----------------------------------------- */

    const list =
        document.createElement("ul");


    recommendations.forEach(
        function (recommendation) {

            const item =
                document.createElement("li");


            item.textContent =
                recommendation;


            list.appendChild(item);

        }
    );


    recommendationsElement.appendChild(
        list
    );

}


/* =========================================================
   FINAL REPORT SUMMARY
   ========================================================= */

function displayFinalSummary(data) {

    const summaryElement =
        document.getElementById(
            "finalReportSummary"
        );


    if (!summaryElement) {

        return;

    }


    const score =
        Number(data.hygieneScore) || 0;


    const riskLevel =
        data.riskLevel || "Unknown";


    let performance;


    if (score >= 80) {

        performance =
            "excellent";

    }

    else if (score >= 60) {

        performance =
            "moderate";

    }

    else {

        performance =
            "poor";

    }


    summaryElement.textContent =

        "The food hygiene simulation produced an " +

        score +

        "% hygiene score with " +

        performance +

        " hygiene performance. " +

        "The simulated contamination risk was classified as " +

        riskLevel +

        ". Review the identified risk factors and " +

        "implement the recommended corrective actions " +

        "to improve food safety.";

}


/* =========================================================
   NO REPORT
   ========================================================= */

function showNoReport() {

    const scoreElement =
        document.getElementById("reportScore");


    const performanceElement =
        document.getElementById(
            "reportPerformance"
        );


    const riskElement =
        document.getElementById("reportRisk");


    const riskScoreElement =
        document.getElementById(
            "reportRiskScore"
        );


    const statusElement =
        document.getElementById(
            "assessmentStatus"
        );


    if (scoreElement) {

        scoreElement.textContent =
            "0%";

    }


    if (performanceElement) {

        performanceElement.textContent =
            "No Result";

    }


    if (riskElement) {

        riskElement.textContent =
            "Unknown";

    }


    if (riskScoreElement) {

        riskScoreElement.textContent =
            "0";

    }


    if (statusElement) {

        statusElement.textContent =
            "Not Completed";

    }

}


/* =========================================================
   REPORT BUTTONS
   ========================================================= */

function setupReportButtons() {


    /* -----------------------------------------
       GENERATE REPORT
       ----------------------------------------- */

    const generateBtn =
        document.getElementById(
            "generateReportBtn"
        );


    if (generateBtn) {

        generateBtn.addEventListener(
            "click",
            function () {

                const savedData =
                    localStorage.getItem(
                        "foodHygieneSimulation"
                    );


                if (!savedData) {

                    alert(
                        "Please complete the food hygiene simulation first."
                    );

                    return;

                }


                /*
                   Save report status.
                */

                localStorage.setItem(
                    "foodHygieneReport",
                    savedData
                );


                alert(
                    "Food hygiene report generated successfully."
                );


                loadReport();

            }
        );

    }


    /* -----------------------------------------
       PRINT REPORT
       ----------------------------------------- */

    const printBtn =
        document.getElementById(
            "printReportBtn"
        );


    if (printBtn) {

        printBtn.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }


    /* -----------------------------------------
       DASHBOARD
       ----------------------------------------- */

    const dashboardBtn =
        document.getElementById(
            "dashboardBtn"
        );


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
 