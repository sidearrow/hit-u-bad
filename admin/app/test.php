<?php

require __DIR__ . '/vendor/autoload.php';

$conf = require __DIR__ . '/src/content_config.php';

use Src\Services\ContentService;

$cs = new ContentService();
$a = $cs->readXLSX('./content.xlsx', $conf);

$f = fopen('./a.json', 'w');
fputs($f, json_encode($a, JSON_UNESCAPED_UNICODE));
