<?php

    // set up the connection variables
    require 'config.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //read the json file contents
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $userid = $request->userid;
    $pid = $request->pid;
    $usergender = $request->reviews->clientgender;
    $userage = $request->reviews->clientage;
    $userjob = $request->reviews->clientjob;
    $score = $request->reviews->score;
    $overall = $request->reviews->overall;
    $services = $request->reviews->services;
    $good = $request->reviews->good;
    $better = $request->reviews->better;
    $anonymous = $request->reviews->anonymous;
    $name = $request->name;
    $ipaddress = $_SERVER['REMOTE_ADDR'];

    // a query get all the records from the users table
    $sql = "INSERT INTO user_review (userid, pid, usergender, userage, userjob, score, overall, services, good, better, anonymous, name, ip) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // use prepared statements, even if not strictly required is good practice
    $stmt = $pdo->prepare( $sql );

    // execute the query
    $stmt->execute(array($userid,$pid,$usergender,$userage,$userjob,$score,$overall,$services,$good,$better,$anonymous,$name,$ipaddress));

    // the message
    $msg = "A review has been posted\n";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    // send email
    mail("jack@objectivemoney.co.za","Review posted",$msg);

    // disconnect from database
    Database::disconnect();

?>