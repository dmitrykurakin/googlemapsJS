<?php
  $origin = $_POST['sendOrigin'];
  $destination = $_POST['sendDestination'];
  $distance = $_POST['sendDistance'];
  $pickupTime = $_POST['sendDatetimepicker'];
  $passNum = $_POST['sendCountPass'];
  $name = $_POST['sendName'];
  $comment = $_POST['sendComments'];
  $email = $_POST['sendEmail'];
  $mobile = $_POST['sendMobile'];
  $price = $_POST['sendPrice'];
  $tollRoads = $_POST['sendCheckTolls'];

  $host = 'localhost';
  $db_name = 'googlemaps';
  $db_user = 'webform';
  $db_pass = '123456789';
  $charset = 'utf-8';
  $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

  $conn = new PDO("mysql:host=$host; dbname=$db_name", $db_user, $db_pass);
  $sqlInjection = 'INSERT INTO purchases(
    checktoll, comment, destination, distance,
    mail, mobile, numpass, origin, pickup, price)
    VALUES(
    :tollRoads, :comment, :destination, :distance,
    :email, :mobile, :passNum, :origin, :pickupTime, :price
  )';

  $query = $conn->prepare($sqlInjection);
  $query -> execute([
    'tollRoads'=>$tollRoads,
    'comment'=>$comment,
    'destination'=>$destination,
    'distance'=>$distance,
    'email'=>$email,
    'mobile'=>$mobile,
    'passNum'=>$passNum,
    'origin'=>$origin,
    'price'=>$price,
    'pickupTime'=>$pickupTime]);

    $id = $conn->lastInsertID();
    echo $id;








 ?>
