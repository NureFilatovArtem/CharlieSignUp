<?php
header('Content-Type: application/json');

// Получаем данные из формы
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$telegram = $_POST['telegram'] ?? '';

// Формируем данные для отправки
$data = array(
    'name' => $name,
    'email' => $email,
    'tg' => $telegram,
    'phone' => $phone
);

// Инициализируем cURL
$ch = curl_init('http://185.125.50.27:8080/form');

// Настраиваем параметры запроса
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
));

// Выполняем запрос
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Закрываем cURL
curl_close($ch);

// Проверяем ответ
if ($http_code === 200) {
    echo $response; // Возвращаем ответ от API
} else {
    // В случае ошибки возвращаем свой ответ
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Failed to submit form',
        'code' => $http_code
    ));
} 