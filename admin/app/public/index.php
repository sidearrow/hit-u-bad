<?php

use Dotenv\Dotenv;
use Slim\Factory\AppFactory;
use Src\Controller;
use Src\DB;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

DB::init();

$app = AppFactory::create();

$app->get("/", Controller::class . ":index");
$app->get("/content/{contentName}", Controller::class . ":contentGet");
$app->get("/content/{contentName}/csv", Controller::class . ":contentGetCSV");

$app->run();
