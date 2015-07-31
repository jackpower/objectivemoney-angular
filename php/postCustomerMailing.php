<?php

    // set up the connection variables
    require 'config.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //read the json file contents
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    $firstname = $request->customerList->firstname;
    $surname = $request->customerList->surname;
    $email = $request->customerList->email;
    $value = $request->searchquery->clientvalue;
    $monthlysalary = $request->searchquery->monthlysalary;
    $lumpsum = $request->searchquery->lumpsum;
    $addresslat = $request->searchquery->lat;
    $addresslong = $request->searchquery->long;
    $investments = $request->searchquery->investments;
    $LT = $request->searchquery->LT;
    $ST = $request->searchquery->ST;
    $EP = $request->searchquery->EP;
    $TP = $request->searchquery->TP;
    $MA = $request->searchquery->MA;
    $english = $request->searchquery->english;
    $afrikaans = $request->searchquery->afrikaans;
    $zulu = $request->searchquery->zulu;
    $xhosa = $request->searchquery->xhosa;
    $southernsotho = $request->searchquery->southernsotho;
    $tswana = $request->searchquery->tswana;
    $northernsotho = $request->searchquery->northernsotho;
    $tsonga = $request->searchquery->tsonga;
    $venda = $request->searchquery->venda;
    $swati = $request->searchquery->swati;
    $ndebele = $request->searchquery->ndebele;
    $searchgender = $request->searchquery->gender;
    $ipaddress = $_SERVER['REMOTE_ADDR'];


    // a query get all the records from the users table
    $sql = "INSERT INTO mailinglist_customers (firstname, surname, email, value, monthlysalary, lumpsum, addresslat, addresslong, investments, LT, ST, EP, TP, MA, english, afrikaans, zulu, xhosa, southernsotho, tswana, northernsotho, tsonga, venda, swati, ndebele, searchgender, ip) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // use prepared statements, even if not strictly required is good practice
    $stmt = $pdo->prepare( $sql );

    // execute the query
    $stmt->execute(array($firstname, $surname, $email, $value, $monthlysalary, $lumpsum, $addresslat, $addresslong, $investments, $LT, $ST, $EP, $TP, $MA, $english, $afrikaans, $zulu, $xhosa, $southernsotho, $tswana, $northernsotho, $tsonga, $venda, $swati, $ndebele, $searchgender, $ipaddress));

    // disconnect from database
    Database::disconnect();

?>