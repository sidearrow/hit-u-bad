<?php

namespace Src;

use Exception;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class AuthMiddleware
{
    public function __invoke(Request $request, RequestHandler $requestHandler): Response
    {
        $response = new Response();
        try {
            $header = $request->getHeaderLine('Authorization');
            $token = trim(ltrim($header, 'Bearer'));
            $auth = Auth::getInstance();
            $auth->check($token);
        } catch (Exception $e) {
            $response = $response->withStatus(401);
            return $response;
        }
        $response = $requestHandler->handle($request);
        return $response;
    }
}
