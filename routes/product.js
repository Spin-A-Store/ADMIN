var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var needle = require('needle');
var passport = require('passport')
var pass = require('../passport/passport.js')
var multer = require('multer');
var mkdirp = require('mkdirp');
var basePath = config.mediapath;
var logger = require('../logger/logger.js');
var imageFilePath = config.imagebaseurl;
var im = require('imagemagick');
var Promise = require('bluebird');
//var im = Promise.promisifyAll(require('imagemagick'));
var Util = require('../util/util.js');
//***********************************************File upload multer utility******************************************************//

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        //callback(null,"C:\\pkhaat\\API\\digitalAssets\\" );
        dir = basePath + req.user[0]._id + "\\" + req.body.productid + "\\";
        // dir=basePath;
        mkdirp(dir, function(err) {
            if (err) console.error(err)
            callback(null, dir);
        });

    },
    filename: function(req, file, callback) {

        var filename = Date.now() + file.originalname;

        callback(null, filename);
    }
});
var upload = multer({
    storage: storage
}).array('userPhoto', 10);

//**************************To be Deleted************************************************************************//

//
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', {
        layout: false,
        data: {
            test: "test"
        }
    });
});



router.post('/create', function(req, res, next) {
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
                    return res.json({
                        err: 'Could not login user',
                        sessionId: req.session.id
                    });
                }
                res.render('adminhome', {
                    layout: false,
                    data: {
                        test: "test"
                    }
                });

            });
        })(req, res, next);

    })
    //***********************************************************************************//
    //***********************************************************************************//
router.get('/login', function(req, res, next) {
    res.render('login', {
        layout: false,
        data: {
            test: "test"
        }
    });
});
//***********************************************************************************//


//***********************************************************************************//
//***********************************************************************************//
router.post('/loginadmin', function(req, res, next) {
    logger.info("entered into")
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err)
        }
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
            res.redirect('/store/adminhome?parm1=' + user._id)

        });
    })(req, res, next);
});

router.get('/adminhome', pass.ensureAuthenticated, function(req, res, next) {
    needle.post('http://localhost:3000/store/getstoredetailsbyid', {
        id: req.query.parm1
    }, {
        json: true
    }, function(err, resp) {
        res.render('adminhome', {
            layout: false,
            data: {
                store: resp.body
            }
        });
    });

});
//////To be  deleted End
//***********************************************************************************//

router.get('/product', pass.ensureAuthenticated, function(req, res, next) {
    res.render('product', {
        layout: false,
        data: {
            test: "test"
        }
    });
});


//**************************************************//


router.get('/createproductform', pass.ensureAuthenticated, function(req, res, next) {
    res.render('createProduct', {

        data: {
            store: {
                "_id": req.query.var1
            }
        }
    });
});


//***********************************************************************************//
router.post('/createproduct', pass.ensureAuthenticated, function(req, res, next) {

    var sku = req.body.sku;
    if (!req.body.sku) sku = req.body.title + "-" + Util.getShortId();

    var data = {
        storeId: req.user[0]._id,
        name: req.body.title,
        desc: [{
            "lang": "en",
            val: req.body.descr
        }],
        sku: sku
    }

    needle.post(Util.apiURL("catalog", "createProduct"), data, {
        json: true
    }, function(err, resp, body) {
        if (err) return res.send("ERROR");
        res.send(body);
    });
});
//***********************************************************************************//
////***********************************************************************************//

router.post('/updateproductdescription', pass.ensureAuthenticated, function(req, res, next) {



    var data = {
        storeId: req.user[0]._id,
        productid: req.body.productid,
        desc: req.body.descr

    }

    needle.post(Util.apiURL("catalog", "updateproductdescription"), data, {
        json: true
    }, function(err, resp, body) {
        if (err) return res.send("ERROR");
        res.send(body);
    });
});
//***********************************************************************************//
////***********************************************************************************//
router.get('/getproduct', pass.ensureAuthenticated, function(req, res, next) {
    console.log(req.user)

    needle.get('http://localhost:3000/catalog/getproductsbystoreid/' + req.user[0]._id, function(err, resp, body) {
        if (err) return res.send("ERROR");


        res.render('modifyproduct', {

            data: body
        });

    });
});

//***********************************************************************************//
////***********************************************************************************//
/*router.get('/modifyproduct', pass.ensureAuthenticated, function(req, res, next) {

 needle.get('http://localhost:3000/catalog/getproductAndVarientbyproductid/' + req.query.var, function(err, resp, body) {
  if (err) return res.send("ERROR");
  var resposne = {
   store: {
    _id: body.storeId
   },
   response: body
  }

  console.log(resposne);

  res.render('productdetails', {

   data: resposne
  });

 });




});**/
router.get('/modifyproduct', pass.ensureAuthenticated, function(req, res, next) {

    needle.get('http://localhost:3000/catalog/getproductAndVarientbyproductid/' + req.query.var, function(err, resp, body) {
        if (err) return res.send("ERROR");
        var resposne = {
            store: {
                _id: body.storeId
            },
            response: body
        }

        console.log(resposne);
        res.render('createProduct', { layout: "main", data: body });

    });




});

router.get('/getproductImagebyproductid', pass.ensureAuthenticated, function(req, res, next) {

    needle.get('http://localhost:3000/catalog/getproductAndVarientbyproductid/' + req.query.var, function(err, resp, body) {
        if (err) return res.send("ERROR");
        var resposne = {
            store: {
                _id: body.storeId
            },
            response: body
        }

        console.log(resposne);
        res.send(body);

    });




});
//***********************************************************************************//
////***********************************************************************************//

/*router.post('/productimageupload',pass.ensureAuthenticated, function(req, res, next) {




   upload(req,res,function(err) {

var data={
  productid:req.body.productid,
  filepath:imageFilePath+req.body.storeid+"/"+req.body.productid+"/"+req.files[0].filename,
  thumbnailpath:imageFilePath+req.body.storeid+"/"+req.body.productid+"/"+thumbnail(req.files[0].filename)

}

 im.resize({
  srcPath: req.files[0].path,
  dstPath: req.files[0].destination+thumbnail(req.files[0].filename),
  width: 100,
  height: 100
}, function(err, stdout, stderr){
  if (err) throw err;
  console.log('thumbnail getting generated');
});


    needle.post('http://localhost:3000/catalog/addproductimage', data, {json:true}, function(err, resp) {
    if(err) return res.send("ERROR");
   res.send("OK");
    });

  });


});*/
//Imagemagic does not have API to to produce mutltiple  image output, so I am making three calls to generate three thiumbnails
router.post('/productimageupload', pass.ensureAuthenticated, function(req, res, next) {


    upload(req, res, function(err) {

        var data = {
            productid: req.body.productid,
            filepath: imageFilePath + req.user[0]._id + "/" + req.body.productid + "/" + req.files[0].filename,
        }

        new Promise(function(resolve, reject) {

            im.resize({
                srcPath: req.files[0].path,
                dstPath: req.files[0].destination + thumbnail(req.files[0].filename, "100"),
                width: 100,
                height: 100
            }, function(err, data1) {
                if (err) {
                    reject(err);
                } else {
                    data.thumbnailsrc100 = imageFilePath + req.user[0]._id + "/" + req.body.productid + "/" + thumbnail(req.files[0].filename, "100")
                    resolve(data)
                }
            });

        }).then(function(data1) {

            return new Promise(function(resolve, reject) {

                im.resize({
                    srcPath: req.files[0].path,
                    dstPath: req.files[0].destination + thumbnail(req.files[0].filename, "50"),
                    width: 50,
                    height: 50
                }, function(err, data1) {
                    if (err) {
                        reject(err);
                    } else {
                        data.thumbnailsrc50 = imageFilePath + req.user[0]._id + "/" + req.body.productid + "/" + thumbnail(req.files[0].filename, "50")
                        resolve(data)
                    }
                });

            })





        }).then(function(data1) {
            return new Promise(function(resolve, reject) {

                im.resize({
                    srcPath: req.files[0].path,
                    dstPath: req.files[0].destination + thumbnail(req.files[0].filename, "25"),

                    width: 25,
                    height: 25
                }, function(err, data1) {
                    if (err) {
                        reject(err);
                    } else {
                        data.thumbnailsrc25 = imageFilePath + req.user[0]._id + "/" + req.body.productid + "/" + thumbnail(req.files[0].filename, "25")
                        resolve(data)
                    }
                });

            })



        }).then(function(data1) {
                return new Promise(function(resolve, reject) {
                    needle.post('http://localhost:3000/catalog/addproductimage', data, {
                        json: true
                    }, function(err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {

                            resolve(body)
                        }
                    });


                })

            }

        ).then(function(data) {

            res.send(data)
        }).catch(function(err) {
            res.send(err);
            console.log(err)
        });



    });


});

var thumbnail = function(name, size) {
    console.log("Enterred" + name)

    console.log("thumbnail")
    var stringArray = name.split(".");
    console.log("thumbnail" + stringArray[0] + "thumb" + size + "." + stringArray[1])

    return stringArray[0] + "thumb" + size + "." + stringArray[1];



}


//***********************************************************************************//
////***********************************************************************************//
//***********************************************************************************//
router.post('/createvarienttype', pass.ensureAuthenticated, function(req, res, next) {

    console.log(req.body)

    var data = {
        productid: req.body.productid,
        attrs: {
            "name": req.body.key,
            "values": req.body.value.split(",")
        }
    }

    needle.post('http://localhost:3000/catalog/addProductVarientType', data, {
        json: true
    }, function(err, resp) {
        if (err) return res.send("ERROR");
        res.send("OK");
    });

});


router.get('/getproductvarient', pass.ensureAuthenticated, function(req, res, next) {

    console.log("input paratmeter" + req.query.var1)

    needle.get('http://localhost:3000/catalog/getProductAndVarientbystoreId/' + req.query.var1, function(err, resp, body) {
        if (err) return res.send("ERROR");
        var resposne = {
            store: {
                _id: req.query.var1
            },
            response: body
        }

        console.log(resposne);

        res.render('createProductVarient', {

            data: resposne
        });

    });
});

router.get('/getProductAndVarientbystoreId', pass.ensureAuthenticated, function(req, res, next) {

    console.log("input paratmeter" + req.query.var1)

    needle.get('http://localhost:3000/catalog/getProductAndVarientbystoreId/' + req.user[0]._id, function(err, resp, body) {
        if (err) return res.send("ERROR");
        var resposne = {
            store: {
                _id: req.query.var1
            },
            response: body
        }

        console.log(body);

        res.send(body);

    });
});

//***********************************************************************************//
router.post('/createproductvarient', pass.ensureAuthenticated, function(req, res, next) {




    var data = {
        name: req.body.varientName,
        productId: req.body.pid,
        sku: req.body.sku,
        attrs: Util.varientAttributes(req.body)
    }

    needle.post(Util.apiURL("catalog", "createProductVariant"), data, {
        json: true
    }, function(err, resp) {
        if (err) return res.send("ERROR");
        res.send("OK");
    });





});
//***********************************************************************************//
////***********************************************************************************//
///
router.get('/producthome', pass.ensureAuthenticated, function(req, res, next) {

    needle.get('http://localhost:3000/catalog/getproductsbystoreid/' + req.user[0]._id, function(err, resp, body) {
        if (err) return res.send("ERROR");



        res.render('producthome', { layout: "main", data: body });

    });









});

router.get('/category', pass.ensureAuthenticated, function(req, res, next) {





    res.render('category', { layout: "main" });






});

router.get('/createproduct', pass.ensureAuthenticated, function(req, res, next) {





    res.render('createproduct', { layout: "main" });






});

router.get('/getCategoryTreeByStoreid', pass.ensureAuthenticated, function(req, res, next) {
    console.log("EEEEEEEEEEE" + JSON.stringify(req.user));

    console.log("TTTTTEEEEEEEEESSSSSSSS" + Util.apiURL("catalog", "getproductcategorytree") + req.user[0]._id);

    needle.get(Util.apiURL("catalog", "getproductcategorytree") + req.user[0]._id, function(err, resp) {
        if (err) return res.send("ERROR");
        res.send({ "text": "/", "children": resp.body });
    });








});

router.post('/renameCategory', pass.ensureAuthenticated, function(req, res, next) {
    console.log("aasasdadadasdasdasd" + req.body.category);
    var data = Util.categoryRequestData(req.body.category);
    data['storeid'] = req.user[0]._id;

    console.log("data" + JSON.stringify(data));
    console.log(Util.apiURL("catalog", "createCategory"));

    needle.post(Util.apiURL("catalog", "createCategory"), data, {
        json: true
    }, function(err, resp) {
        if (err) return res.send("ERROR");
        res.send("OK");
    });








});



module.exports = router;
