// Load required packages
var needle = require('needle');

// Create endpoint /api/users for POST
exports.createStore = function(req, res) {
    console.log("xdgdfgdfgf");
    var data={
     storename: req.body.storename,
     ownerEmail: req.body.ownerEmail,
     username: req.body.username,
     password: req.body.password,
     domainName: req.body.storename

    }

	needle.post('http://localhost:3000/store/createStore', data, {json:true}, function(err, resp) {
		  res.render('adminhome', {layout: false,data: {test:"test"}});
		});
};

