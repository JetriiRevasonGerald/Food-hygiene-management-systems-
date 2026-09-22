<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once __DIR__ . "/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON data."
    ]);
    exit;
}

$user_id = isset($data["user_id"]) ? intval($data["user_id"]) : 1;
$simulation_type = $data["simulation_type"] ?? "";

if (!$simulation_type) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Simulation type is required."
    ]);
    exit;
}

$pythonFile = "";
switch ($simulation_type) {
    case "Practical 1":
        $pythonFile = __DIR__ . "/practical1.py";
        break;
    case "Practical 2":
        $pythonFile = __DIR__ . "/practical2.py";
        break;
    case "Contamination Simulation":
        $pythonFile = __DIR__ . "/contamination.py";
        break;
    default:
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Unknown simulation type."
        ]);
        exit;
}

// Fallback command resolution for different OS environments
$python = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') ? "python" : "python3";
$jsonInput = json_encode($data);
$command = $python . " " . escapeshellarg($pythonFile);

$descriptorspec = [
    0 => ["pipe", "r"],
    1 => ["pipe", "w"],
    2 => ["pipe", "w"]
];

$process = proc_open($command, $descriptorspec, $pipes);

if (!is_resource($process)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not start Python execution."
    ]);
    exit;
}

fwrite($pipes[0], $jsonInput);
fclose($pipes[0]);

$pythonOutput = stream_get_contents($pipes[1]);
fclose($pipes[1]);

$pythonError = stream_get_contents($pipes[2]);
fclose($pipes[2]);

$returnCode = proc_close($process);

if ($returnCode !== 0) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Python execution failed.",
        "error" => $pythonError
    ]);
    exit;
}

$result = json_decode(trim($pythonOutput), true);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON response from Python.",
        "python_output" => $pythonOutput
    ]);
    exit;
}

if (isset($result["error"])) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Python returned an error.",
        "error" => $result["error"]
    ]);
    exit;
}

// Support both snake_case and camelCase outputs from Python scripts
$hygieneScore = floatval($result["hygieneScore"] ?? $result["hygiene_score"] ?? 0);
$riskScore = floatval($result["riskScore"] ?? $result["risk_score"] ?? 0);
$riskLevel = $result["riskLevel"] ?? $result["risk_level"] ?? "Low Risk";
$riskFactors = json_encode($result["riskFactors"] ?? $result["risk_factors"] ?? []);
$recommendations = json_encode($result["recommendations"] ?? []);

try {
    $sql = "
        INSERT INTO simulations
        (
            user_id,
            simulation_type,
            hygiene_score,
            risk_score,
            risk_level,
            risk_factors,
            recommendations
        )
        VALUES
        (
            :user_id,
            :simulation_type,
            :hygiene_score,
            :risk_score,
            :risk_level,
            :risk_factors,
            :recommendations
        )
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":user_id" => $user_id,
        ":simulation_type" => $simulation_type,
        ":hygiene_score" => $hygieneScore,
        ":risk_score" => $riskScore,
        ":risk_level" => $riskLevel,
        ":risk_factors" => $riskFactors,
        ":recommendations" => $recommendations
    ]);

    $simulationId = $pdo->lastInsertId();

    echo json_encode([
        "success" => true,
        "message" => "Simulation completed successfully.",
        "simulation_id" => $simulationId,
        "simulation_type" => $simulation_type,
        "hygieneScore" => $hygieneScore,
        "hygiene_score" => $hygieneScore,
        "riskScore" => $riskScore,
        "risk_score" => $riskScore,
        "riskLevel" => $riskLevel,
        "risk_level" => $riskLevel,
        "riskFactors" => json_decode($riskFactors, true),
        "risk_factors" => json_decode($riskFactors, true),
        "recommendations" => json_decode($recommendations, true),
        "temperature" => $data["temperature"] ?? "",
        "handHygiene" => $data["hand_hygiene"] ?? $data["handHygiene"] ?? "",
        "crossContamination" => $data["crossContamination"] ?? "",
        "waterQuality" => $data["water_quality"] ?? $data["waterQuality"] ?? "",
        "cleaning" => $data["cleaning"] ?? "",
        "pestControl" => $data["pestControl"] ?? "",
        "wasteManagement" => $data["waste_management"] ?? $data["wasteManagement"] ?? "",
        "foodHandling" => $data["foodHandling"] ?? "",
        "date" => date("Y-m-d H:i:s")
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to save simulation to database.",
        "error" => $e->getMessage()
    ]);
}
?>