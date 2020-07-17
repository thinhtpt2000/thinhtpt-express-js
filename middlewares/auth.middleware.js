var db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	var id = req.signedCookies.userId;
	if (!id) {
		res.redirect('/auth/login');
		return;
	}
	var user = db.get('users').find({id: id }).value();
	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
}