<?php

namespace App\Http\Repositories\Main;

use App\Models\Status;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Repositories\Repository;

class StatusRepository extends Repository {

    public function all(...$params) {
        return Status::all();
    }

    public function get($id) {
        return Status::findOrFail($id);
    }

    public function save($data) {
        return Status::create($data);
    }

    public function update($id, $data) {
        $status = Status::findOrFail($id);
        $status->update($data);
        return $status;
    }

    public function delete($id) {
        $status = Status::findOrFail($id);
        return $status->delete();
    }
}