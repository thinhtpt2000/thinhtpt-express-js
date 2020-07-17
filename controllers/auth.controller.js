var md5 = require('md5');

var db = require('../db');

module.exports.login = (req, res) => {
	res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
	var email = req.body.email;
	var password= req.body.password;
	var user = db.get('users').find( {email: email }).value();
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