var express = require('express');
var router = express.Router();
var user = require('../schema/index.js').user
/* add  users . */
router.post('/', function (req, res, next) {
  let body = req.body;
  if ('email' in body && 'name' in body && 'password' in body) {
    user.create(body)
    .then(function(result) {
      res.send({ code: 200, msg: 'ok', result:  result.id });
    })
    .catch(function(error) {
      next(error)
    })
  } else {
    res.send({ code: 400, msg: '参数不全'})
  }
});
router.get('/', function (req, res, next) {
  user.findAll()
  .then(function(data) {
    res.send({ code: 200, result: data})
  })
  .catch(function(error) {
    next(error)
  })
})
module.exports = router;
