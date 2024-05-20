<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registroformulario";
$puerto = 3306;


$conn = new mysqli($servername, $username, $password, $dbname, $puerto );

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $email = $data['email'];
    $celular = $data['celular'];
    $asunto = $data['asunto'];
    $mensaje = $data['mensaje'];

    $sql = "INSERT INTO usuarios (nombre, apellido, email, celular, asunto, mensaje) 
    VALUES ('$nombre', '$apellido', '$email', '$celular', '$asunto', '$mensaje')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
} else {
    $sql = "SELECT * FROM usuarios";
    $result = $conn->query($sql);
    $users = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = array("nombre" => $row["nombre"],"apellido" => $row["apellido"] , "email" => $row["email"], "celular" => $row["celular"], 
            "asunto" => $row["asunto"], "mensaje" => $row["mensaje"]);
        }
    }

    echo json_encode($users);
}

$conn->close();
?>