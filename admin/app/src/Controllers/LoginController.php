<?php

namespace Src\Controllers;

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LoginController extends BaseController
{
    public function __invoke(Request $request, Response $response, array $args)
    {
        $reqBody = json_decode($request->getBody(), true);

        $userName = $reqBody['userName'];
        $password = $reqBody['password'];

        try {
            $jwt = $this->auth->login($userName, $password);
            $resBody = json_encode(['token' => $jwt]);
            $response->getBody()->write($resBody);
        } catch (Exception $e) {
            $response = $response->withStatus(400);
            $response->getBody()->write('invalid user or password');
        }

        return $response;
    }
}
