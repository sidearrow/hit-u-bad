const fs = require('fs');
const xlsx = require('xlsx');

const SHEET_NAME = {
  ANNUAL_SCHEDULE: '年間スケジュール',
  PRACTICE_SCHEDULE: '練習スケジュール',
  LEAGUE_RESULT: 'リーグ戦結果',
  MEMBER: '部員一覧',
  OB_MESSAGE: 'OB通信',
  SANTAMA: '三多摩大会結果',
  PAGE: 'ページ',
};

function convert({ ws, header, func }) {
  const res = xlsx.utils.sheet_to_json(ws, { header: header, defval: null });
  res.shift();
  return func ? func(res) : res;
}

function convertMember(rows) {
  const split = (_v) => (_v === null ? [] : _v.split(','));
  return rows.map((r) => ({
    ...r,
    ...{ positions: split(r.positions), oldPositions: split(r.oldPositions) },
  }));
}

function convertPages(rows) {
  return rows.reduce((acc, r) => ({ ...acc, ...{ [r.id]: r } }), {});
}

const jobs = [
  [
    'annualSchedule',
    SHEET_NAME.ANNUAL_SCHEDULE,
    ['date', 'title', 'description'],
  ],
  ['leagueResult', SHEET_NAME.LEAGUE_RESULT, ['year', 'm', 'w']],
  [
    'members',
    SHEET_NAME.MEMBER,
    [
      'lastName',
      'firstName',
      'gender',
      'admissionYear',
      'faculty',
      'positions',
      'oldPositions',
      'highschool',
    ],
    convertMember,
  ],
  [
    'obMessages',
    SHEET_NAME.OB_MESSAGE,
    ['obMessageId', 'year', 'title', 'fileName'],
  ],
  ['pages', SHEET_NAME.PAGE, ['id', 'title', 'description'], convertPages],
  [
    'practiceSchedule',
    SHEET_NAME.PRACTICE_SCHEDULE,
    ['dow', 'normal', 'holiday'],
  ],
  ['santamaResult', SHEET_NAME.SANTAMA, ['year', 'title', 'fileName']],
];
const wb = xlsx.readFile('content.xlsx');

const content = jobs.reduce((acc, cur) => {
  acc[cur[0]] = convert({
    ws: wb.Sheets[cur[1]],
    header: cur[2],
    func: cur[3],
  });
  return acc;
}, {});

fs.writeFileSync('src/content.json', JSON.stringify(content, null, 2));
