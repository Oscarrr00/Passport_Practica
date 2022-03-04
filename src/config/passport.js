const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User')

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log('working');
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
            try{
                const UserFound = await User.find(profile.id);
                done(null,UserFound);
            }catch(err){
                const newUser = {
                    id: profile.id,
                    email: profile.emails,
                    imageUrl: profile.profileUrl || 'https://i.pinimg.com/736x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
                }
                done(null,User.create(newUser));
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.find(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

