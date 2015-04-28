<?php

require_once(__DIR__ . "/../model/config.php");

function authenticateUser() {
    //checks to see if you put in the correct password
    if (!isset($_SESSION["authenticated"])) {
        return false;
    } else {
        if ($_SESSION["authenticated"] != true) {
            return false;
        } else {
            return true;
        }
    }
}
