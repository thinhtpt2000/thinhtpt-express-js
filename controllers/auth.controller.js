var md5 = require('md5');

// var db = require('../db');
var User = require('../models/user.model');

module.exports.login = (req, res) => {
	res.render('auth/login');
}

module.exports.postLogin = async (req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;
	var user = await User.findOne( {email: email });
	if (!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist'
			],
			email: email
		});
		return;
	}

	var hashedPassword = md5(password);
	if (user.password !== hashedPassword) {
		res.render('auth/login', {
			errors: [
				'Wrong password'
			],
			email: email
		});
		return;
	}
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');
}