<?php

namespace Src\Controllers;

use Src\Auth;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class BaseController
{
    protected Auth $auth;

    public function __construct()
    {
        $this->auth = Auth::getInstance();
    }
}
