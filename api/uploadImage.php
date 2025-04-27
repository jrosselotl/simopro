<?php
$targetDir = "../uploads/";
$targetFile = $targetDir . basename($_FILES["image"]["name"]);

if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
  echo "uploads/" . basename($_FILES["image"]["name"]);
} else {
  http_response_code(500);
  echo "Error subiendo archivo.";
}
?>
