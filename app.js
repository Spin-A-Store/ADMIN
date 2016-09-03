var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');

var loginAndRegisterRoute = require('./routes/loginAndRegisterRoute');
var users = require('./routes/users');
var product = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/product', express.static(path.join(__dirname, 'public')));

//*********************call passport  configurations********************//
//**********************************************************//
require('./passport/passport.js');


//**********************************************************************//



//*********************configure Session********************//
//**********************************************************//
app.use(expressSession({
    secret: 'thisIsTopSecretSoDontTellAnyone',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false
    }
}));

//*********************configure Session********************//










//*********************Initialize Routes********************//
//**********************************************************//

app.use(passport.initialize());
app.use(passport.session());

//**********************************************************//


//*********************configure Routes********************//
//**********************************************************//

app.use('/', loginAndRegisterRoute);
app.use('/users', users);
app.use('/product', product);
app.get('*', function(req, res) {
    res.render('404', { layout: false, data: { test: "test" } });
});


//*********************configure Routes********************//

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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


module.exports = app;
