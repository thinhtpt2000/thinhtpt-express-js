// var db = require('../db');
var User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
	var id = req.signedCookies.userId;
	if (!id) {
		res.redirect('/auth/login');
		return;
	}
	var user = await User.findOne({_id: id });

	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	// console.log(res.locals.user);

	next();
}