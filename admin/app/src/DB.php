<?php

namespace Src;

use Exception;
use PDO;

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

class DB
{
    public static PDO $pdo;

    public static function init()
    {
        self::$pdo = getPdo();
    }

    public static function fetchAll(string $query, array $args = [])
    {
        $st = self::$pdo->prepare($query);
        $st->execute($args);
        return $st->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function exec(string $query, array $args = [])
    {
        $st = self::$pdo->prepare($query);
        $st->execute($args);
    }

    public static function transaction(callable $func)
    {
        try {
            self::$pdo->beginTransaction();
            $func();
            self::$pdo->commit();
        } catch (Exception $e) {
            self::$pdo->rollBack();
        }
    }
}
