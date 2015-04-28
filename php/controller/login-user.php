<?php

require_once(__DIR__ . "/../model/config.php");

$array = array(
    'exp' => '',
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => '',
);

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

$query = $_SESSION["connection"]->query("SELECT salt, password FROM users WHERE username = '$username'");

if ($query->num_rows == 1) {
    $row = $query->fetch_array();
    //tells if the password you put in is correct
    if ($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        echo "<p>Login successful!</p>";
    } else {
        //if the wrong password is put in it will put out the given code below
        echo "<p> ACCESS FORBIDDEN !,Invalid username and password, please try agian or sing up<p>";
    }
       } else {
        echo "<p>ACCESS FORBIDDEN!,Invalid username and password<p>";
    }
?>
<button><a class="list-group-item" href="../Index.php">Home</a></button>