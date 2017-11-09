var express = require('express');
var router = express.Router();
var modal = require('../schema/index.js')
/* add  commit . */
router.post('/', function (req, res, next) {
  let body = req.body;
  console.log(body, commit)
  // commit.create(body)
  // .then(function(result) {
  //   res.send({ code: 200, msg: 'ok', result:  result.id });
  // })
  // .catch(function(error) {
  //   next(error)
  // })
 res.send('test')
});

router.get('/', function(req, res, next) {
  modal.commit.findAll({
    include: { 
      model: modal.user,
      as: 'commiter',
      attributes: ['id', 'name', 'email']
    }
  })
  .then(function(result) {
    res.send({ code: 200, result: result })
  })
  .catch(function(error) {
    next(error)
  })
})

module.exports = router;
