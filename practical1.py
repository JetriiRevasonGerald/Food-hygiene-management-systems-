def run_practical1(
    temperature,
    hand_hygiene,
    cleaning,
    water_quality,
    waste_management
):

    risk_score = 0
    risk_factors = []
    recommendations = []

    # Temperature
    if temperature == "unsafe":
        risk_score += 25
        risk_factors.append(
            "Unsafe food storage temperature."
        )
        recommendations.append(
            "Maintain food at a safe storage temperature."
        )

    elif temperature == "moderate":
        risk_score += 10

    # Hand hygiene
    if hand_hygiene == "poor":
        risk_score += 25
        risk_factors.append(
            "Poor hand hygiene."
        )
        recommendations.append(
            "Improve hand washing and personal hygiene."
        )

    elif hand_hygiene == "moderate":
        risk_score += 10

    # Cleaning
    if cleaning == "poor":
        risk_score += 20
        risk_factors.append(
            "Poor cleaning and sanitation."
        )
        recommendations.append(
            "Improve cleaning and sanitation procedures."
        )

    elif cleaning == "moderate":
        risk_score += 10

    # Water
    if water_quality == "unsafe":
        risk_score += 20
        risk_factors.append(
            "Unsafe water quality."
        )
        recommendations.append(
            "Use safe and clean water for food handling."
        )

    elif water_quality == "moderate":
        risk_score += 10

    # Waste
    if waste_management == "poor":
        risk_score += 10
        risk_factors.append(
            "Poor waste management."
        )
        recommendations.append(
            "Improve waste storage and disposal."
        )

    elif waste_management == "moderate":
        risk_score += 5

    # Risk classification
    if risk_score <= 20:
        risk_level = "Low Risk"

    elif risk_score <= 50:
        risk_level = "Moderate Risk"

    else:
        risk_level = "High Risk"

    hygiene_score = max(0, 100 - risk_score)

    return {
        "hygiene_score": hygiene_score,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "risk_factors": risk_factors,
        "recommendations": recommendations
    }


# =========================================
# JSON INPUT / OUTPUT FOR PHP
# =========================================
if __name__ == "__main__":
    import sys
    import json

    try:
        # Read JSON sent by simulation.php
        input_data = json.load(sys.stdin)

        # Get Practical 1 values
        temperature = input_data.get("temperature", "")
        hand_hygiene = input_data.get("hand_hygiene", "")
        cleaning = input_data.get("cleaning", "")
        water_quality = input_data.get("water_quality", "")
        waste_management = input_data.get("waste_management", "")

        # Run the existing Practical 1 simulation
        result = run_practical1(
            temperature,
            hand_hygiene,
            cleaning,
            water_quality,
            waste_management
        )

        # Return JSON to simulation.php
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({
            "error": str(e)
        }))
        sys.exit(1)
