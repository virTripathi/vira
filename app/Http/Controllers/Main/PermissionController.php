<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use Illuminate\Http\Request;

class PermissionController extends Controller
{

    private $permissionRepository;
    function __construct() {
        $repository = new RepositoryBuilder();
        $this->permissionRepository = $repository->build("Main/Permission");
    }
    
    public function index() {
        return $this->permissionRepository->all();
    }

    public function store() {

    }

    public function update() {

    }

    public function delete() {
        
    }
}
