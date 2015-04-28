<?php

class Database {

    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        $this->connection = new mysqli($host, $username, $password);
        //will shut off the program if the is an error
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        } else {
            echo "sucsess: " . $this->connection->host_info;
        }

        $exists = $this->connection->select_db($database);

        if (!$exists) {
            //creates the database
            $query = $this->connection->query("CREATE DATABASE $database");

            if ($query) {
                echo "<p>Successfully created database" . $database . "</p>";
            }
        } else {
            echo "<p>database has already exists.</p>";
        }
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        //ends the program when error is found
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }

    public function closeConnection() {
        if (isset($this->connection)) {
            //closes the connection
            $this->connection->close();
        }
    }

    public function query($string) {
        $this->openConnection();


        $query = $this->connection->query($string);

        $this->closeConnection();
        // returns query
        return $query;
    }

}
