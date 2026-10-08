import sys
import json


def run_contamination(data):

    risk_score = 0
    risk_factors = []
    recommendations = []

    raw_food_contact = data.get("rawFoodContact", "")

    if raw_food_contact == "possible":
        risk_score += 4
        risk_factors.append("Possible contact between raw and ready-to-eat food.")
        recommendations.append("Keep raw and ready-to-eat foods separated.")
    elif raw_food_contact == "high":
        risk_score += 6
        risk_factors.append("High risk of raw food contamination.")
        recommendations.append("Use separate equipment and preparation areas.")

    equipment = data.get("equipmentHygiene", "")

    if equipment == "poor":
        risk_score += 4
        risk_factors.append("Poor equipment hygiene.")
        recommendations.append("Clean and sanitize food-contact equipment.")
    elif equipment == "moderate":
        risk_score += 2
        risk_factors.append("Moderate equipment hygiene.")
        recommendations.append("Improve equipment cleaning and sanitation.")

    hand_washing = data.get("handWashing", "")

    if hand_washing == "poor":
        risk_score += 4
        risk_factors.append("Poor hand washing practices.")
        recommendations.append("Wash hands properly before handling food.")
    elif hand_washing == "moderate":
        risk_score += 2
        risk_factors.append("Inconsistent hand washing.")
        recommendations.append("Improve hand washing frequency and technique.")

    storage = data.get("foodStorage", "")

    if storage == "unsafe":
        risk_score += 5
        risk_factors.append("Unsafe food storage conditions.")
        recommendations.append("Store food under appropriate conditions.")
    elif storage == "moderate":
        risk_score += 2
        risk_factors.append("Moderate food storage conditions.")
        recommendations.append("Improve food storage practices.")

    maximum_risk = 19
    hygiene_score = round(((maximum_risk - risk_score) / maximum_risk) * 100)
    hygiene_score = max(0, min(100, hygiene_score))

    if risk_score <= 4:
        risk_level = "Low Risk"
    elif risk_score <= 9:
        risk_level = "Moderate Risk"
    else:
        risk_level = "High Risk"

    if not risk_factors:
        risk_factors.append("No major contamination risks detected.")

    if not recommendations:
        recommendations.append("Continue maintaining good contamination prevention practices.")

    return {
        "simulationType": "Contamination Simulation",
        "practical": "Food Contamination Risk Simulation",
        "hygieneScore": hygiene_score,
        "hygiene_score": hygiene_score,
        "riskScore": risk_score,
        "risk_score": risk_score,
        "riskLevel": risk_level,
        "risk_level": risk_level,
        "riskFactors": risk_factors,
        "risk_factors": risk_factors,
        "recommendations": recommendations
    }


if __name__ == "__main__":
    try:
        input_data = sys.stdin.read()
        if not input_data.strip():
            data = {}
        else:
            data = json.loads(input_data)

        result = run_contamination(data)
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)