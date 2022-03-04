const express = require('express');
const path = require('path');
const AuthRouter = require('./routes/auth.route');
const ProfileRouter = require('./routes/profile');
require('dotenv').config();
require('./config/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['clave'] //clave para encriptar
}));
  //inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.redirect('/public/html/home.html');
  });

app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);
module.exports = app;
