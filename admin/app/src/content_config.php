<?php
return [
    'annualSchedule' => [
        'sheetName' => '年間スケジュール',
        'fields' => [
            'date',
            'title',
            'description',
        ],
    ],
    'practiceSchedule' => [
        'sheetName' => '練習スケジュール',
        'fields' => [
            'dow',
            'normal',
            'holiday',
        ],
    ],
    'leagueResult' => [
        'sheetName' => 'リーグ戦結果',
        'fields' => [
            'year',
            'm',
            'w',
        ]
    ],
    'obMessage' => [
        'sheetName' => 'OB通信',
        'fields' => [
            'obMessageId',
            'year',
            'title',
            'fileName',
        ],
    ],
    'member' => [
        'sheetName' => '部員一覧',
        'fields' => [
            'lastName',
            'firstName',
            'gender',
            'admissionYear',
            'faculty',
            'positions',
            'oldPositions',
            'highschool',
        ],
        'customLoader' => function (array $rows) {
            $splitPositions = function ($v) {
                return $v == null ? [] : explode(',', $v);
            };
            $newRows = [];
            foreach ($rows as $row) {
                $row['positions'] = $splitPositions($row['positions']);
                $row['oldPositions'] = $splitPositions($row['oldPositions']);
                $newRows[] = $row;
            }
            return $newRows;
        }
    ],
    'page' => [
        'sheetName' => 'ページ',
        'fields' => [
            'id',
            'title',
            'description',
        ],
        'customLoader' => function (array $rows) {
            $new = [];
            foreach ($rows as $row) {
                $new[$row['id']] = $row;
            }
            return $new;
        },
    ],
];
