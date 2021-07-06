<?php

namespace Src;

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Src\Services\ContentService;

class Controller
{
    public function index(Request $request, Response $response, array $args)
    {
        $response->getBody()->write('ok');
        return $response;
    }

    public function contentGet(Request $request, Response $response, array $args)
    {
        $contentService = new ContentService();
        $content = $contentService->get();
        $response->getBody()->write($content);
        return $response;
    }

    public function contentPost(Request $request, Response $response, array $args)
    {
        $files = $request->getUploadedFiles();
        if (!array_key_exists('contentXLSX', $files)) {
            $response = $response->withStatus(400);
            $response->getBody()->write('file 1');
            return $response;
        }
        $contentFile = (string)$files['contentXLSX']->getStream();
        $tf = tmpfile();
        fputs($tf, $contentFile);
        $tfName = stream_get_meta_data($tf)['uri'];
        $cs = new ContentService();
        $cs->put($tfName, require __DIR__ . '/content_config.php');
        return $response;
    }
}
