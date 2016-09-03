var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var needle = require('needle');
var hash = require('bcrypt-nodejs');
var _ = require('lodash-node');
var logger=require('../logger/logger.js');
var Util = require('../util/util.js');





// define 'signup' strategy, used for login
passport.use('signup', new localStrategy({
    // need req in callback to get post params
    passReqToCallback : true
  },
 function(req, password, username, authCheckDone) {

      var data={
     storename: req.body.storename,
     owneremail: req.body.username,
     password: req.body.password,
     domainName: req.body.storename

    }

  needle.post(Util.apiURL("store", "registerStore"), data, {json:true}, function(err, resp) {
     if (err) return authCheckDone(err);

          console.log("SSSSSSSSSSSSSSS"+JSON.stringify(resp.body));
        authCheckDone(null, resp.body);
    });
})



);

passport.serializeUser(function(store, done) {

  console.log("store.owneremail"+store.owneremail)
  done(null, store.owneremail);
});

passport.deserializeUser(function(owneremail, done) {


   needle.get(Util.apiURL("store", "getStoreDetailsbyOwnerEmail")+owneremail, function(err, resp) {

    done(err, resp.body);
    });
});

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

passport.use(new localStrategy({
    // need req in callback to get post params
    passReqToCallback : true
  },
  // no strategy name (defaults to 'local'), no options, just the verify function
  function(req,username, password, authCheckDone) {


   needle.post(Util.apiURL("store", "storeAdminAuthentication"), {owneremail:req.body.username,password:req.body.password}, {json:true}, function(err, resp) {
     if (err) return authCheckDone(err);
     if(resp.body.excpcode){

       if (resp.body.excpcode=="S003") return authCheckDone(null, false, 'Invalid password');

      if (resp.body.excpcode=="S002") {
        return authCheckDone(null, false, 'User does not exist');
      }

     }else {
      authCheckDone(null, resp.body);
     }


    });


  })
);









