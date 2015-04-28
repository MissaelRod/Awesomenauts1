<?php
require_once(__DIR__ . "/../model/config.php");

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$passwor = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

$hashedpassword = crypt($password, $salt);

$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "email = '$email',"
        . "username = '$username',"
        . "password = '$hashedpassword',"
        . "salt = '$salt',"
        . "exp = 0, "
        . "exp1 = 0, "
        . "exp2 = 0, "
        . "exp3 = 0, "
        . "exp4 = 0");

$SESSION["name"] = $username;

if($query){  
    //need this for Ajax on index.php
    echo "true";
}

else{
  echo "<p>" . $_SESSION["connection"]->error . "</p>"; 
}
?>
<button><a class="list-group-item" href="../login.php">Login</a></button>