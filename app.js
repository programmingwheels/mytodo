var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./config/db')
var mongoose = require('mongoose')
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)



mongoose.connect(db.url, function() {
    console.log("Connected to database")
})

io.on('connect', function(socket) {
    console.log("Hello world")
    socket.on('disconnect', function() {
        console.log('Disconnected')
    })

})


app.use(function(req, res, next) {
    req.io = io;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routes);
app.use('/', users);

app.get('*', function(req, res) {
    res.sendFile('index.html')
})

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = { app: app, server: server };