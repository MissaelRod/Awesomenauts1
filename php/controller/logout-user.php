<?php
//checks to see if password is authentic
require_once(__DIR__ . "/../model/config.php");

unset($_SESSION["authenticated"]);

session_destroy();
header("Location: " . $path . "index.php");
