module.exports.run = function(io) {
  io.sockets.on('connect', function (socket) {
    // console.log('socket', socket)
    socket.send('连接成功')
    socket.on('build', function(data) {
      console.log('build', data)
    })
  })
}
let model = require('../schema/index.js')
let tool = require('../lib/tool.js')

module.exports.hook = function (io, handler) {
  handler.on('push', function (event) {
    var payload = event.payload, 
    repository = payload.repository,
    head_commit = payload.head_commit
    io.sockets.emit('push:all', event.payload)
    io.sockets.emit('push:' + repository.name, payload)
    /**
     * 存档数据库操作
     */
    let data = tool.gitResp(payload)
    model.commit.create(data)
    .then(function(ls) {
      console.log('jwb', ls)
    })

    console.log('Data: %s -- a push event for %s to %s', 
      head_commit.timestamp, 
      repository.name, 
      payload.ref)
  })
}