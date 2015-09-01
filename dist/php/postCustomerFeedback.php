<?php

    // set up the connection variables
    require 'config.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //read the json file contents
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $find = $request->feedback->find;
    $improve = $request->feedback->improve;
    $email = $request->feedback->email;
    $number = $request->feedback->phoneNumber;
    $npsScore = $request->feedback->npsScore;
    $ipaddress = $_SERVER['REMOTE_ADDR'];

    // a query get all the records from the planner table
    $sql = "INSERT INTO customer_feedback (email, find, improve, phoneNumber, npsScore, ip) values(?, ?, ?, ?, ?, ?)";

    // use prepared statements, even if not strictly required is good practice
    $stmt = $pdo->prepare( $sql );

    // execute the query
    $stmt->execute(array($email,$find,$improve,$number,$npsScore,$ipaddress));

    // the message
    $msg = "Customer feedback has been given\n";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    // send email
    mail("jack@objectivemoney.co.za","Feedback posted",$msg);

    // disconnect from database
    Database::disconnect();

?>