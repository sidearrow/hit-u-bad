<?php

namespace Src\Services;

use Error;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx as XlsxReader;
use Src\DB;

class ContentService
{
    public function put(string $filepath, array $config): void
    {
        $xlsxReader = new XlsxReader();
        $ss = $xlsxReader->load($filepath);
        $res = [];
        foreach ($config as $k => $sheetConfig) {
            $sheetName = $sheetConfig['sheetName'];
            $fields = $sheetConfig['fields'];
            $sheet = $ss->getSheetByName($sheetName);
            if ($sheet == null) {
                throw new Error('Not found sheet ' . $sheetName);
            }
            $sheetData = $sheet->toArray();
            $data = [];
            foreach ($sheetData as $row) {
                $tmp = [];
                foreach ($fields as $i => $f) {
                    $tmp[$f] = $row[$i];
                }
                $data[] = $tmp;
            }
            if (array_key_exists('customLoader', $sheetConfig)) {
                $data = $sheetConfig['customLoader']($data);
            }
            $res[$k] = $data;
        }
        $json = json_encode($res, JSON_UNESCAPED_UNICODE);
        DB::exec('insert into content (value) values (?)', [$json]);
    }

    public function get()
    {
        $res = DB::fetch('select value from content order by id desc limit 1');
        return $res['value'];
    }
}
