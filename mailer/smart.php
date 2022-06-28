<?php // говорим серверу что будет запускаться php фаил

$name = $_POST['name'];     // переменные которые мы используем в form>input в html
$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');  // запускаем php script
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

// настройки
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'zloy.and.mad@gmail.com';                 // Наш логин. ОБЯЗАТЕЛЬНО!
$mail->Password = '1AlliancE';                           // Наш пароль от ящика. ОБЯЗАТЕЛЬНО!
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
// настройка самого письма
$mail->setFrom('RomanZloy', 'Pulse');   // От кого письмо. ОБЯЗАТЕЛЬНО! 
$mail->addAddress('devip48990@cupbest.com');     // Куда будут приходить письма. ОБЯЗАТЕЛЬНО!
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?> 