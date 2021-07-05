<?php

namespace Src;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Src\Services\ContentService;

class Controller
{
    public function index(Request $request, Response $response, array $args)
    {
        return $response;
    }

    public function contentGet(Request $request, Response $response, array $args)
    {
        return $response;
    }

    public function contentGetCSV(Request $request, Response $response, array $args)
    {
        $contentName = $args["contentName"];
        $contentService = new ContentService($contentName);
        $res = $contentService->getCSV();
        $response->getBody()->write($res);
        return $response;
    }
}
