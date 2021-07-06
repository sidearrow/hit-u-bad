<?php

namespace Src\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AuthCheckController extends BaseController
{
    public function __invoke(Request $request, Response $response, array $args)
    {
        $response->getBody()->write('ok');
        return $response;
    }
}
