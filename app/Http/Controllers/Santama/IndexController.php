<?php

namespace App\Http\Controllers\Santama;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke(Request $request)
    {
        return view('pages.santama');
    }
}
