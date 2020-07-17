require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route')
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var apiProductRoute = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/products', apiProductRoute);

app.use(cookieParser(process.env.SESSION_SECRET));
// use session middleware
app.use(sessionMiddleware);
// app.use(csrf({ cookie: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', {
		name: 'Demo Shop'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

// app.use('/api/products', apiProductRoute);

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});