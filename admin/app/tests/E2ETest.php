<?php

use GuzzleHttp\Client as HttpClient;
use PHPUnit\Framework\TestCase;

class E2ETest extends TestCase
{
    public function testLoginSuccess()
    {
        $hc = new HttpClient();

        $res = $hc->request(
            'POST',
            'http://localhost/login',
            ['json' => ['userName' => 'admin', 'password' => 'adminpassword']],
        );
        $this->assertEquals(200, $res->getStatusCode());
        $token = json_decode((string)$res->getBody(), true)['token'];

        $res = $hc->request(
            'GET',
            'http://localhost/auth-check',
            ['headers' => ['Authorization' => 'Bearer ' . $token]],
        );
        $this->assertEquals(200, $res->getStatusCode());
    }

    public function testLoginFailed()
    {
        $hc = new HttpClient();

        $res = $hc->request(
            'POST',
            'http://localhost/login',
            [
                'json' => ['userName' => 'admin', 'password' => 'wrongpass'],
                'http_errors' => false
            ],
        );
        $this->assertEquals(401, $res->getStatusCode());
    }

    public function testAuthCheckFailed()
    {
        $hc = new HttpClient();

        $res = $hc->request(
            'GET',
            'http://localhost/auth-check',
            [
                'headers' => ['Authorization' => 'Bearer: invalid-token'],
                'http_errors' => false
            ],
        );
        echo (string) $res->getBody();
        $this->assertEquals(401, $res->getStatusCode());
    }
}
