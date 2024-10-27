<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use Illuminate\Http\Request;

class RoleController extends Controller
{

    private $roleRepository;
    function __construct() {
        $repository = new RepositoryBuilder();
        $this->roleRepository = $repository->build("Main/Role");
    }
    
    public function index() {
        return $this->roleRepository->all();
    }

    public function store() {

    }

    public function update() {

    }

    public function delete() {
        
    }
}
