<?php

namespace Src;

use Exception;
use Firebase\JWT\JWT;
use Src\Config;

class Auth
{
    private static Auth $instance;

    private const JWT_ALG = 'HS256';
    private array $users;
    private string $jwtKey;

    public function __construct(array $users, string $jwtKey)
    {
        $this->users = $users;
        $this->jwtKey = $jwtKey;
    }

    public static function init()
    {
        self::$instance = new self(
            [
                'admin' => Config::$adminPassword,
                'mizutori' => Config::$mizutoriPassword,
            ],
            Config::$jwtKey,
        );
    }

    public static function getInstance()
    {
        return self::$instance;
    }

    public function login(string $userName, string $password)
    {
        if (!array_key_exists($userName, $this->users)) {
            throw new Exception('user not found');
        }
        if (!password_verify($password, $this->users[$userName])) {
            throw new Exception('invalid password');
        }
        $payload = [
            'userName' => $userName,
        ];
        $jwt = JWT::encode($payload, $this->jwtKey, self::JWT_ALG);
        return $jwt;
    }

    public function check(string $jwt)
    {
        $decoded = JWT::decode($jwt, $this->jwtKey, [self::JWT_ALG]);
        return $decoded->userName;
    }
}
