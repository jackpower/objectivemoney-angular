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
    $requirements = $request->enquiry->requirements;
    $usergender = $request->enquiry->usergender;
    $userage = $request->enquiry->userage;
    $userjob = $request->enquiry->userjob;
    $phonenumber = $request->enquiry->phonenumber;
    $ipaddress = $_SERVER['REMOTE_ADDR'];

    // a query get all the records from the users table
    $sql = "INSERT INTO user_enquiry (userid, pid, requirements, usergender, userage, userjob, phonenumber,ip) values(?, ?, ?, ?, ?, ?, ?, ?)";

    // use prepared statements, even if not strictly required is good practice
    $stmt = $pdo->prepare( $sql );

    // execute the query
    $stmt->execute(array($userid,$pid,$requirements,$usergender,$userage,$userjob,$phonenumber,$ipaddress));

    // disconnect from database
    Database::disconnect();

?>