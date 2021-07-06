<?php

namespace Src;

use Exception;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class AuthMiddleware
{
    private string $userName;

    public function __construct(string $userName)
    {
        $this->userName = $userName;
    }

    public function __invoke(Request $request, RequestHandler $requestHandler): Response
    {
        $response = new Response();
        try {
            $header = $request->getHeaderLine('Authorization');
            $token = trim(ltrim($header, 'Bearer'));
            $auth = Auth::getInstance();
            $userName = $auth->check($token);
            if ($userName != $this->userName) {
                throw new Exception('invalid user');
            }
        } catch (Exception $e) {
            $response = $response->withStatus(403);
            return $response;
        }
        $response = $requestHandler->handle($request);
        return $response;
    }
}
