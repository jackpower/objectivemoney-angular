<?php

    // set up the connection variables
    require 'config.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //read the json file contents
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $name = $request->planner->name;
    $email = $request->planner->email;
    $number = $request->planner->number;
    $ipaddress = $_SERVER['REMOTE_ADDR'];

    // a query get all the records from the planner table
    $sql = "INSERT INTO planner_enquiry (name, email, number, ip) values(?, ?, ?, ?)";

    // use prepared statements, even if not strictly required is good practice
    $stmt = $pdo->prepare( $sql );

    // execute the query
    $stmt->execute(array($name,$email,$number, $ipaddress));

    // the message
    $msg = "A planner enquiry has been made\n";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    // send email
    mail("jack@objectivemoney.co.za","Review posted",$msg);

    // disconnect from database
    Database::disconnect();

?>