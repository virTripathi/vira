<?php

namespace App\Http\Repositories;

class RepositoryBuilder {

    public function build($repository) {
        $repositoryObject = "App\\Http\\Repositories\\" . $repository . "Repository";
        return new $repositoryObject();
    }

    public static function getDtaObject($repository) {
        $repositoryObject = "App\\Http\\Repositories\\". $repository . "Repository";
        return new $repositoryObject();
    }
}