<?php

require_once(__DIR__ . "/database.php");
session_start();
session_regenerate_id(true);
//creates multiple pathes
$path = "/Awsomenauts1/php/";
$host = "localhost";
$username = "root";
$password = "root";
$database = "awsomenauts_db";


if (!isset($_SESSION["connection"])) {
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}