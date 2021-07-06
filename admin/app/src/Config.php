<?php

namespace Src;

class Config
{
    public static string $dataDir;
    public static string $jwtKey;
    public static string $adminPassword;
    public static string $mizutoriPassword;

    public static function init()
    {
        self::$dataDir = $_ENV['DATA_DIR'];
        self::$jwtKey = $_ENV['JWT_KEY'];
        self::$adminPassword = $_ENV['ADMIN_PASSWORD'];
        self::$mizutoriPassword = $_ENV['MIZUTORI_PASSWORD'];
    }
}
