require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var heritagesitesRouter = require('./routes/heritagesites');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const HeritageSite = require('./models/heritageSite'); 
const resourceRouter = require('./routes/resource');

async function recreateDB() {
  // Delete existing documents
  await HeritageSite.deleteMany();

  // Create new instances
  const site1 = new HeritageSite({ name: "Great Wall of China", location: "China", year_established: 1987 });
  const site2 = new HeritageSite({ name: "Machu Picchu", location: "Peru", year_established: 1450 });
  const site3 = new HeritageSite({ name: "Pyramids of Giza", location: "Egypt", year_established: -2560 });

  // Save instances
  site1.save().then(doc => console.log("First heritage site saved:", doc)).catch(console.error);
  site2.save().then(doc => console.log("Second heritage site saved:", doc)).catch(console.error);
  site3.save().then(doc => console.log("Third heritage site saved:", doc)).catch(console.error);
}

const reseed = true;
if (reseed) { recreateDB(); }


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/heritagesites', heritagesitesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);
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
