<?php

use Src\Services\AuthService;

require __DIR__ . '/../vendor/autoload.php';

$authService = new AuthService(['testuser' => password_hash('testpassword', PASSWORD_DEFAULT)], 'testjwtkey');

$jwt = $authService->login('testuser', 'testpassword');
$res = $authService->check($jwt, 'testuser');

var_dump($res);
