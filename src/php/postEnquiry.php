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
    $user_name = $request->user_name;
    $user_email = $request->user_email;

    // a query get all the records from the users table
    $sql = "INSERT INTO user_enquiry (userid, pid, requirements, usergender, userage, userjob, phonenumber,ip, user_name, user_email) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // use prepared statements, even if not strictly required is good practice
    $stmt = $pdo->prepare( $sql );

    // execute the query
    $stmt->execute(array($userid,$pid,$requirements,$usergender,$userage,$userjob,$phonenumber,$ipaddress, $user_name, $user_email));

    // a query get all the records from the users table
    $sqlb = "UPDATE user_enquiry SET planner_firstname = (SELECT plannerfirstname FROM planner_details WHERE planner_details.pid=user_enquiry.pid)";

    // use prepared statements, even if not strictly required is good practice
    $stmtb = $pdo->prepare( $sqlb );

    // execute the query
    $stmtb->execute();

    // the message
    $msg = "An enquiry has been made\n";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    // send email
    mail("jack@objectivemoney.co.za","Enquiry posted",$msg);

    // disconnect from database
    Database::disconnect();

?>