var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })
var debug = require('debug')('express:server');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * git handle 
 */
app.use(function(req, res, next) {
  handler(req, res, function (err) {
    // res.statusCode = 404
    // res.end('no such location')
    next()
  })
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
server.listen(port, function() {
  console.log('the server is start in a port:' + port)
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  io.sockets.emit('online', '链接成功')
})
// git handle push 
handler.on('push', function (event) {
  // io.sockets.emit('push:All', event.payload)
  var repository = event.payload.repository
  io.sockets.emit('push:all', event.payload)
  io.sockets.emit('push:' + repository.name, event.payload)
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})