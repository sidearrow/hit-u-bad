<?php

use Dotenv\Dotenv;
use Slim\Factory\AppFactory;
use Src\Service;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app = AppFactory::create();

$app->get("/", Service::class . ":index");
$app->get("/content/{contentName}", Service::class . ":contentGet");

$app->run();
