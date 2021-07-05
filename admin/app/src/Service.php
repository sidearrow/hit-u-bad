<?php

namespace Src;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

function getPdo()
{
    $host = $_ENV["DB_HOST"];
    $port = $_ENV["DB_PORT"];
    $user = $_ENV["DB_USER"];
    $dbname = $_ENV["DB_NAME"];
    $password = $_ENV["DB_PASSWORD"];
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s', $host, $port, $dbname);
    $options = [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    ];
    $pdo = new PDO($dsn, $user, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    return $pdo;
}

class Service
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = getPdo();
    }

    public function index(Request $request, Response $response, array $args)
    {
        $st = $this->pdo->prepare("select * from config");
        $st->execute();
        $res = $st->fetchAll();
        var_dump($res);
        $response->getBody()->write("index");
        return $response;
    }

    public function contentGet(Request $request, Response $response, array $args)
    {
        var_dump($args);
        return $response;
    }
}
