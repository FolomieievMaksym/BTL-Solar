<?php
define('TG_TOKEN', '5766091008:AAEA9Uq5RRpKyk2584Dxhy2b57fjZtKqLPo');
define('TG_CHAT_ID', '1111958389');

function sendTelegram($msg){
    $chat_id = TG_CHAT_ID;
    //$disable_web_page_preview = null;
    //$reply_to_message_id = null;
    //$reply_markup = null;

    $data = array(
        'chat_id' => urlencode($chat_id),
        'text' => $msg
        //'disable_web_page_preview' => urlencode($disable_web_page_preview),
        //'reply_to_message_id' => urlencode($reply_to_message_id),
        //'reply_markup' => urlencode($reply_markup)
    );

    $url = 'https://api.telegram.org/bot'.TG_TOKEN.'/sendMessage';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, count($data));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}

$link = "success.php";
$method = $_SERVER['REQUEST_METHOD'];
//Script Foreach
$c = true;
$message = "";
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

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

$name = isset($_POST['name']) ? $_POST['name'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$tg_text = "Имя: $name\nТелефон: $phone\nE-mail: $email";
sendTelegram($tg_text);
mail($admin_email, adopt($form_subject), $message, $headers );



header('Location: '.$link);