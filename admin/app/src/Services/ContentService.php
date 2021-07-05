<?php

namespace Src\Services;

use Src\DB;

class ContentService
{
    private string $contentName;
    private string $tableName;

    public function __construct(string $contentName)
    {
        $this->contentName = $contentName;
        $this->tableName = "content_" . $contentName;
    }

    public function getCSV()
    {
        $query = "select * from " . $this->tableName;
        $res = DB::fetchAll($query);
        $fp = fopen("php://memory", "bw+");
        foreach ($res as $row) {
            fputcsv($fp, $row);
        }
        rewind($fp);
        return stream_get_contents($fp);
    }

    public function importCSV()
    {
        DB::transaction(function () {
            DB::exec("delete from " . $this->tableName);
        });
    }
}
