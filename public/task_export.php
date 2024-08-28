<?php

$DB_CONNECTION = "mysql";
$DB_HOST = "127.0.0.1";
$DB_PORT = 3306;
$DB_DATABASE = "mini_jarvis";
$DB_USERNAME = "root";
$DB_PASSWORD = "";

$mysqli = new mysqli($DB_HOST, $DB_USERNAME, $DB_PASSWORD, $DB_DATABASE, $DB_PORT);

if ($mysqli->connect_error) {
    die("MySQL Connection failed: " . $mysqli->connect_error);
}

try {
    $sql = "SELECT 
    tasks.id,
    tasks.title,
    tasks.description,
    tasks.due_date,
    statuses.title as status,
    task_priorities.title as task_priority,
    created_user.name as created_by,
    tasks.created_at,
    updated_user.name as updated_by, 
    tasks.updated_at FROM tasks
    join statuses on statuses.id = tasks.status_id
    join task_priorities on task_priorities.id = tasks.task_priority_id
    left join users as created_user on created_user.id = tasks.created_by
    left join users as updated_user on updated_user.id = tasks.updated_by";

    $result = $mysqli->query($sql);
    if ($result === false) {
        die("SQL error: " . $mysqli->error);
    }
    if ($result->num_rows > 0) {
        $filename = "tasks_export_" . time() . ".csv";
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename="' . $filename . '"');

        $file = fopen('php://output', 'w');
        $firstRow = $result->fetch_assoc();
        if ($firstRow) {
            fputcsv($file, array_keys($firstRow));
            fputcsv($file, $firstRow);
        }
        while ($row = $result->fetch_assoc()) {
            fputcsv($file, $row);
        }
        fclose($file);
    } else {
        echo "No tasks found";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}

$mysqli->close();

?>
