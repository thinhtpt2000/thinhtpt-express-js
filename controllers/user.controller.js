var shortid = require('shortid');

// var db = require('../db');
var User = require('../models/user.model');

module.exports.index = async (req, res) => {
	res.render('users/index', {
		users: await User.find({})
	});
}

module.exports.search = async (req, res) => {
	try {
		var q = req.query.q;
		var matchUsers = await User.find({}).filter((user) => {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
		res.render('users/index', {
			users: matchUsers,
			q: q
		});
	} catch (err) {
		res.redirect('/users');
	}
}

module.exports.create = (req, res) => {
	res.render('users/create');
}

module.exports.get = async (req, res) => {
	var id = req.params.id;
	var user =  await User.findOne({ _id: id });
	res.render('users/view', {
		user: user
	});
}

module.exports.postCreate = (req, res) => {
	// req.body.id = shortid.generate();

	req.body.avatar = '/' + req.file.path.split('\\').slice(1).join('/');

	console.log(req.body);

	var user = new User(req.body);

	console.log(user);

	user.save((err, user) => {
		if (err) return console.error(err);
	})

	// db.get('users').push(req.body).write();
	res.redirect('/users');
}
 /* Co the dung dang nay
module.exports = {

};
*/