<?php

namespace App\Http\Repositories;


abstract class Repository {

    abstract function all(...$params);

    abstract function get($id);

    abstract function save($data);

    abstract function update($id, $data);

    abstract function delete($id);
}