const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const assert = chai.assert
const expect = chai.expect

const app = require('../app/controller').app

const testData = require('./testdata/bbs-post')

process.env.ENV = 'TEST'

describe('掲示板API', function () {
  this.timeout(10000)

  let id;

  it('投稿', function (done) {
    chai
      .request(app)
      .post('/bbs/post')
      .set('content-type', 'application/json')
      .send(JSON.stringify(testData.case1))
      .end(function (err, res) {
        assert.property(res.body, 'id')
        assert.equal(res.body.isSuccess, true)

        id = res.body.id
        done()
      })
  })

  it('複数投稿確認', function (done) {
    chai
      .request(app)
      .get('/bbs/posts')
      .end(function (err, res) {
        assert.equal(res.body[0].id, id)
        assert.hasAllKeys(
          res.body[0],
          [
            'id',
            'title',
            'author',
            'content',
            'createdAt',
            'updatedAt',
            'createdAtRaw',
            'updatedAtRaw',
            'commentNum',
          ]
        )

        done()
      })
  })

  it('投稿取得', function (done) {
    chai
      .request(app)
      .get(`/bbs/post/${id}`)
      .end(function (_, res) {
        assert.equal(res.body.auth, false)
        assert.hasAllKeys(
          res.body,
          [
            'auth',
            'id',
            'title',
            'author',
            'content',
            'createdAt',
            'updatedAt',
            'createdAtRaw',
            'updatedAtRaw',
            'comments',
          ]
        )

        done()
      })
  })

  it('投稿取得（パスワード入力）', function (done) {
    chai
      .request(app)
      .get(`/bbs/post/${id}`)
      .query({ password: '1111' })
      .end(function (_, res) {
        assert.equal(res.body.auth, true)

        done()
      })
  })

  it('投稿修正', function (done) {
    chai
      .request(app)
      .put(`/bbs/post/${id}`)
      .set('content-type', 'application/json')
      .send(JSON.stringify(testData.case2))
      .end(function (err, res) {
        assert.equal(res.body.isSuccess, true)

        done()
      })
  })

  it('投稿修正確認', function (done) {
    chai
      .request(app)
      .get(`/bbs/post/${id}`)
      .end(function (err, res) {
        assert.equal(res.body.title, testData.case2.title)
        assert.notEqual(res.body.createdAtRaw, res.body.updatedAtRaw)

        done()
      })
  })

  it('コメント投稿', function (done) {
    chai
      .request(app)
      .post(`/bbs/post/${id}/comment`)
      .set('content-type', 'application/json')
      .send(JSON.stringify(testData.caseComment1))
      .end(function (_, res) {
        assert.equal(res.body.isSuccess, true)

        done()
      })
  })

  it('コメント投稿確認', function (done) {
    chai
      .request(app)
      .get(`/bbs/post/${id}`)
      .end(function (_, res) {
        assert.equal(res.body.comments[0].author, testData.caseComment1.author)
        assert.hasAllDeepKeys(
          res.body.comments[0],
          [
            'author',
            'content',
            'password',
            'isDelete',
            'createdAt',
            'createdAtRaw'
          ]
        )

        done()
      })
  })

  it('コメント削除（失敗）', function (done) {
    chai
      .request(app)
      .delete(`/bbs/post/${id}/comment/0`)
      .query({password: '9999'})
      .end(function (_, res) {
        assert.equal(res.body.isSuccess, false)

        done()
      })
  })

  it('コメント削除（成功）', function (done) {
    chai
      .request(app)
      .delete(`/bbs/post/${id}/comment/0`)
      .query({password: testData.caseComment1.password})
      .end(function (_, res) {
        assert.equal(res.body.isSuccess, true)

        done()
      })
  })

  it('コメント削除確認', function (done) {
    chai
      .request(app)
      .get(`/bbs/post/${id}`)
      .end(function (_, res) {
        assert.equal(res.body.comments[0].isDelete, true)

        done()
      })
  })

  it('投稿削除（失敗）', function (done) {
    chai
      .request(app)
      .delete(`/bbs/post/${id}`)
      .query({password: '9999'})
      .end(function (err, res) {
        assert.equal(res.body.isSuccess, false)

        done()
      })
  })

  it('投稿削除（成功）', function (done) {
    chai
      .request(app)
      .delete(`/bbs/post/${id}`)
      .query({password: testData.case1.password})
      .end(function (err, res) {
        assert.equal(res.body.isSuccess, true)

        done()
      })
  })
})