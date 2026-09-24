import sys
import json


def run_practical2(data):

    risk_score = 0
    risk_factors = []
    recommendations = []

    # Cross-contamination
    contamination = data.get("crossContamination", "")

    if contamination == "possible":
        risk_score += 3
        risk_factors.append(
            "Possible cross-contamination."
        )
        recommendations.append(
            "Separate raw and ready-to-eat foods."
        )

    elif contamination == "high":
        risk_score += 5
        risk_factors.append(
            "High cross-contamination risk."
        )
        recommendations.append(
            "Take corrective action to prevent cross-contamination."
        )

    # Food handling
    food_handling = data.get("foodHandling", "")

    if food_handling == "moderate":
        risk_score += 2
        risk_factors.append(
            "Moderate food handling practices."
        )
        recommendations.append(
            "Improve food handling procedures."
        )

    elif food_handling == "unsafe":
        risk_score += 4
        risk_factors.append(
            "Unsafe food handling practices."
        )
        recommendations.append(
            "Improve food handling practices."
        )

    # Pest control
    pest_control = data.get("pestControl", "")

    if pest_control == "possible":
        risk_score += 3
        risk_factors.append(
            "Possible pest activity."
        )
        recommendations.append(
            "Strengthen pest prevention measures."
        )

    elif pest_control == "present":
        risk_score += 5
        risk_factors.append(
            "Pest presence detected."
        )
        recommendations.append(
            "Take corrective action against pest presence."
        )

    # Temperature
    temperature = data.get("temperature", "")

    if temperature == "moderate":
        risk_score += 2
        risk_factors.append(
            "Moderate food temperature."
        )
        recommendations.append(
            "Improve temperature control."
        )

    elif temperature == "unsafe":
        risk_score += 4
        risk_factors.append(
            "Unsafe food temperature."
        )
        recommendations.append(
            "Maintain safe food temperature."
        )

    # Maximum possible risk = 18
    maximum_risk = 18

    hygiene_score = round(
        ((maximum_risk - risk_score) / maximum_risk) * 100
    )

    hygiene_score = max(0, min(100, hygiene_score))

    # Risk classification
    if risk_score <= 4:
        risk_level = "Low Risk"

    elif risk_score <= 9:
        risk_level = "Moderate Risk"

    else:
        risk_level = "High Risk"

    # No risk factors
    if not risk_factors:
        risk_factors.append(
            "No major hygiene risk factors detected."
        )

    if not recommendations:
        recommendations.append(
            "Continue maintaining good food hygiene practices."
        )

    return {
        "simulationType": "Practical 2",
        "practical": "Food Handling and Contamination Prevention",
        "hygieneScore": hygiene_score,
        "riskScore": risk_score,
        "riskLevel": risk_level,
        "riskFactors": risk_factors,
        "recommendations": recommendations
    }


# Read JSON sent by PHP
try:

    input_data = sys.stdin.read()

    data = json.loads(input_data)

    result = run_practical2(data)

    print(json.dumps(result))

except Exception as e:

    print(json.dumps({
        "error": str(e)
    }))