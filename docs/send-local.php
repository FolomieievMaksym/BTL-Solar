<?php
date_default_timezone_set('Europe/Kiev');
$link = "success.php";

$data = array(
    'name' => $_POST['name'],
    'phone' => $_POST['phone'],
    'email' => $_POST['email'],
    'pixel_id' => $_POST['pixelID'],
    'utm1' => $_POST['utm1'],
    'utm2' => $_POST['utm2'],
    'date' => date('d.m.Y H:i:s'),
    'domain' => $_POST['domain']
);

$dstURL = 'https://gfb.pp.ua/send.php';

$ch = curl_init($dstURL);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$res = curl_exec($ch);
curl_close($ch);

header('Location: '.$link);