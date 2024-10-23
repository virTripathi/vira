<?php

namespace App\Http\Repositories;


abstract class Repository {

    abstract function all();

    abstract function get();

    abstract function save();

    abstract function update();

    abstract function delete();
}