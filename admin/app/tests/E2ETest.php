<?php

use GuzzleHttp\Client as HttpClient;
use PHPUnit\Framework\TestCase;

class E2ETest extends TestCase
{
    public function test_auth()
    {
        $hc = new HttpClient();

        $res = $hc->request(
            'POST',
            'http://localhost/login',
            ['json' => ['userName' => 'admin', 'password' => 'adminpassword']]
        );
        $resBody = json_decode((string)$res->getBody());

        $this->assertArrayHasKey('token', $resBody);
    }
}
