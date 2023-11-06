var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dealerSignupRouter = require('./routes/dealer/register');
var customerSignupRouter = require('./routes/customer/register');
const loginRoutes = require('./routes/loginRoutes');
// const { authenticateToken, authorizeRole } = require('./utils/middleware');
const authenticateToken = require('./routes/authenticateRoute');
const AddProductRoute = require('./routes/dealer/addProductRoute');
const ViewProductRoute = require('./routes/dealer/viewProductRoute');
const ViewThresholdRoute = require('./routes/dealer/viewThresholdRoute');
const UpdateStatusRoute = require('./routes/dealer/updateStatusRoute');
const UpdateProductRoute = require('./routes/dealer/updateProductRoute');
const DeleteProductRoute = require('./routes/dealer/deleteProductRoute');
const CustomerViewProductRoute = require('./routes/customer/CustomerViewProduct');
var CustomerAddToCartRoute = require('./routes/customer/AddToCartRoute');
var CustomerViewCartRoute = require('./routes/customer/viewCartRoute');
var CustomerRemoveFromCartRoute = require('./routes/customer/RemoveFromCartRoute');
var CustomerSupportRoute = require('./routes/customer/AddSupportRoute');
var RespondSupportRoute = require('./routes/dealer/viewSupportRoute');
var replyRoute = require('./routes/dealer/replyRoute');
var dashboardRoute = require('./routes/dealer/dashboardRoute');
var buyRoute = require('./routes//customer/buyRoute');
var buyProductRoute = require('./routes/customer/buyProductRoute');
var viewRevenueRoute = require('./routes/dealer/viewRevenueRoute');










var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var app = express();
var cors=require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registerDealer',dealerSignupRouter)
app.use('/registerCustomer',customerSignupRouter)
app.use('/login', loginRoutes);
app.use('/authentication',authenticateToken);
app.use('/addProduct', AddProductRoute);
app.use('/viewProduct', ViewProductRoute);
app.use('/viewThreshold', ViewThresholdRoute);
app.use('/updateStatus', UpdateStatusRoute);
app.use('/updateProduct', UpdateProductRoute);
app.use('/deleteProduct', DeleteProductRoute);
app.use('/customerViewProduct', CustomerViewProductRoute);
app.use('/customerAddToCart',  CustomerAddToCartRoute);
app.use('/customerViewCart',  CustomerViewCartRoute);
app.use('/customerRemoveFromCart',  CustomerRemoveFromCartRoute);
app.use('/customerSupport',  CustomerSupportRoute);
app.use('/viewSupportRequest',  RespondSupportRoute);
app.use('/dealerReply',  replyRoute);
app.use('/dashboard',  dashboardRoute);
app.use('/buy',  buyRoute);
app.use('/buyProduct',  buyProductRoute);
app.use('/viewRevenue',  viewRevenueRoute);

// // Example route with role-based authorization
// app.get('/dashboard', authenticateToken, authorizeRole(['Dealer', 'Customer']), (req, res) => {
//   res.json({ message: 'Welcome to the dashboard', user: req.user });
// });

// app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
//   res.send('You have access to the admin route.');
// });

// app.get('/user', authorizeRole('user'), (req, res) => {
//   res.send('You have access to the user route.');
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;