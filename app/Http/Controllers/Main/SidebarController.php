<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Services\Main\SidebarService;
use Illuminate\Http\Request;

class SidebarController extends Controller
{
    private $sidebarService;

    function __construct(SidebarService $sidebarService)
    {
        $this->sidebarService = $sidebarService;
    }

    public function index(Request $request) {
        return $this->sidebarService->get();
    }
}
