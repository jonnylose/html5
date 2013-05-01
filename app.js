
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , server
  , io
  , currentPage = 0;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index);

server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  io.sockets.emit('gotopag', { pag: currentPage });
  socket.on('changePag', function (data) {
    console.log('changePag: ' + currentPage + ' to ' + data.pag);
    if(data.pag != currentPage) {
      currentPage = data.pag;
      io.sockets.emit('gotopag', { pag: currentPage });
    }
  });
});
