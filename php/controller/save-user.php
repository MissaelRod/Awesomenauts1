<?php
require_once(__DIR__ . "/../model/config.php");

$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
$exp = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);


$query = $SESSION["connection"]->query("UPDATE users SET "
        . "exp = $exp, "
        . "exp1 = $exp1, "
        . "exp2 = $exp2, "
        . "exp3 = $exp3, "
        . "exp4 = $exp4, WHERE username =\"" . $_SESSION["name"]."\"");
    
    if(query){
        echo "true";
    }else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }