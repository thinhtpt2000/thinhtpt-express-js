// var db = require('../db');
var Product = require('../models/product.model');

module.exports.index = async (req, res) => {
	var page = parseInt(req.query.page) || 1;
	var limit = 8;

	var len = await Product.where().count();
	var numOfPage = Math.ceil(len / 8);

	// console.log(numOfPage);

	var status = '';
	if (page === 1) {
		status = 'start';
	}
	else if (page === numOfPage) {
		status = 'end';
	}

	var products = await Product.find({}, null, {skip: (page-1)*limit, limit: limit});
	res.render('products/index', {
		products: products,
		page: page,
		status: status,
		maxPage: numOfPage
	});
}