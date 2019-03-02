export default {
  url: {
    top     : '/',
    member  : '/member',
    result  : '/result',
    santama : '/santama',
    bbs     : '/bbs/posts',
    bbsNew  : '/bbs/new',
    mizutori: '/mizutori',
    manage  : '/manage',
  },
  title: {
    top     : '一橋大学 バドミントン部',
    member  : '部員紹介 - 一橋大学 バドミントン部',
    result  : '試合結果 - 一橋大学 バドミントン部',
    santama : '三多摩大会 - 一橋大学 バドミントン部',
    bbs     : '掲示板 - 一橋大学 バドミントン部',
    bbsNew  : '掲示板 新規投稿 - 一橋大学 バドミントン部',
    mizutori: 'みずとり会 - 一橋大学 バドミントン部',
  },
  apiBaseUrl: {
    development: 'https://asia-northeast1-dev-hit-u-bad-3a8d2.cloudfunctions.net/api',
    production : 'https://asia-northeast1-hit-u-bad.cloudfunctions.net/api/v1'
  },
  firebase: {
    dev: {
      apiKey: "AIzaSyC_VaJeym5oxGZrrVVXxRCJDQ3fZdb34PM",
      authDomain: "dev-hit-u-bad.firebaseapp.com",
      storageBucket: "dev-hit-u-bad.appspot.com",
    }
  }
}