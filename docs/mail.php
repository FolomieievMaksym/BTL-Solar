<?php
$link = "success.php";
$method = $_SERVER['REQUEST_METHOD'];
//Script Foreach
$c = true;
if ( $method === 'POST' ) {

	$project_name = "Argus";
	$admin_email  = "argus.in.ua@gmail.com";
	$form_subject = "New order";

	$_POST['project_name'] = $project_name;
	$_POST['admin_email'] = $admin_email;
	$_POST['form_subject'] = $form_subject;
	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "utm1" && $key != "utm2" ) {
			$message .= "
			$key: $value;
			";
		}
	}
} else if ( $method === 'GET' ) {
	
	$project_name = "Argus";
	$admin_email  = "argus.in.ua@gmail.com";
	$form_subject = "New order";

	$_GET['project_name'] = $project_name;
	$_GET['admin_email'] = $admin_email;
	$_GET['form_subject'] = $form_subject;

	foreach ( $_GET as $key => $value ) {
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "utm1" && $key != "utm2" ) {
			$message .= "
			$key: $value;
			";
		}
	}
}

$message = "$message";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
header('Location: '.$link);