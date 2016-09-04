var express = require('express');
var router = express.Router();
var logger = require('../logger/logger.js');
var needle = require('needle');
var passport = require('passport');
var pass = require('../passport/passport.js');

//*********************************Login Route*******************************************************//
//This route will render the login form
//***************************************************************************************************//
router.get('/', function(req, res, next) {

    if (req.isAuthenticated()) return res.redirect('/product/producthome')

    logger.info("Entering::" + "loginAndRegisterRoute##" + "PATH::/");
    res.render('login', { layout: false, data: {} });
    logger.info("Leaving::" + "loginAndRegisterRoute##" + "PATH::/");
});

//******************************************************************************************************//

router.get('/logout', function(req, res, next) {

    req.logout();

    logger.info("Entering::" + "loginAndRegisterRoute##" + "PATH::/");
    res.render('logout', { layout: false, data: {} });
    logger.info("Leaving::" + "loginAndRegisterRoute##" + "PATH::/");
});



//**********************Route to handle login for submit************************************************//
//******************************************************************************************************//
router.post('/loginadmin', function(req, res, next) {
    logger.info("Entering::" + "loginAndRegisterRoute##" + "PATH::/loginadmin");
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err) }
        if (!user) {
            return res.json(401, {
                err: info,
                sessionId: req.session.id
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json(500, {
                    err: 'Could not log user in',
                    sessionId: req.session.id
                });
            }
            res.send("Login success");

        });
    })(req, res, next);
    logger.info("Leaving::" + "loginAndRegisterRoute##" + "PATH::/loginadmin");
});
///***Redirect after login
router.get('/adminhome', pass.ensureAuthenticated, function(req, res, next) {
    needle.post('http://localhost:3000/store/getstoredetailsbyid', { id: req.query.parm1 }, { json: true }, function(err, resp) {
        res.render('adminhome', { data: { store: resp.body } });
    });

});

//******************************************************************************************************//



//*********************************Login Route*******************************************************//
//This route will render the login form
//***************************************************************************************************//



router.post('/registerstore', function(req, res, next) {

    passport.authenticate('signup', function(err, user, info) {


        if (err) {
            return res.json(500, {
                err: err,
                sessionId: req.session.id
            });
        }
        if (!user) {
            return res.json(400, {
                err: info,
                sessionId: req.session.id
            });
        }
        req.login(user, function(err) {

            if (err) {
                return res.json(user);
            }
            res.send("OK");

        });
    })(req, res, next);

})



//******************************************************************************************************//
















module.exports = router;
