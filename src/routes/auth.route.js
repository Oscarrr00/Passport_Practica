const router = require('express').Router();
const res = require('express/lib/response');
const passport = require('passport');
// path: auth/

router.get('/login', (req, res) => {
    res.redirect('/public/html/login.html');
});

router.get('/google/login', passport.authenticate('google', { scope:
        ['profile', 'email'] }), 
);

router.get('/google/redirect',(req, res) => {
    res.status(200).send("Intentaste hacer un redirect en google");
});
router.get('/logout',(req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/public/html/home.html')
});

// GET /google/callback
router.get('/google/callback', passport.authenticate('google'), function (req, res) {
    // print req.query.code
    // Successful authentication, redirect to “/”
    console.log(req.query.code)
    res.redirect('/profile');
    }
);
// GET /verifyLogin
router.get('/verifyLogin',(req, res) => {
    if(req.user){
        res.send('Logged In')
    }else{
        res.status(401).send('Not Authorized')
    }
    console.log(req.user)
});
// GET /logout
router.get('/logout',(req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/public/html/home.html');
});

module.exports = router;
