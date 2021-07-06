<?php

use Dotenv\Dotenv;
use Slim\Factory\AppFactory;
use Src\Auth;
use Src\AuthMiddleware;
use Src\Config;
use Src\Controller;
use Src\Controllers\AuthCheckController;
use Src\Controllers\LoginController;
use Src\DB;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

Config::init();
DB::init();
Auth::init();

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

$app->get("/", Controller::class . ":index");
$app->post('/login', LoginController::class);
$app->get('/auth-check', AuthCheckController::class)->add(new AuthMiddleware());
$app->get("/content", Controller::class . ":contentGet");
$app->post("/content", Controller::class . ":contentPost");

$app->run();
