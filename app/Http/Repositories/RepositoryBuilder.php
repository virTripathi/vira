<?php

namespace App\Http\Repositories;

class RepositoryBuilder {

    public function build($repository) {
        $repositoryObject = "App\Repositories\\" . $repository . "Repository";
        return new $repositoryObject();
    }

    public static function getDtaObject($repository) {
        $repositoryObject = "App\Repositories\\". $repository . "Repository";
        return new $repositoryObject();
    }
}