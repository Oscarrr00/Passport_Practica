const router = require('express').Router();
const passport = require('passport');

// path: /admin

router.get('/', (req, res) => {
    if(req.user){
        console.log(req.user)
        res.redirect('../public/html/profile.html'); 
    }else{
        res.redirect('../public/html/login.html'); 
}});

router.get('/user', (req, res) => {
    res.send(req.user);
});

module.exports = router;