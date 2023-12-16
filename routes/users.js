const express = require(`express`);
const router = express.Router();
const User = require(`../models/user`);
const passport = require(`passport`);
const catchAsync = require(`../utils/catchAsync`);
const { storeReturnTo } = require('../middleware');

router.get(`/register`, async function (req, res) {
    res.render(`users/register`);
})

router.post(`/register`, catchAsync(async function (req, res) {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, function (e) {
            if (e) {
                next(e);
            } else {
                req.flash(`success`, `Welcome to YELP CAMP`);
                res.redirect(`/campgrounds`);
            }
        })

    } catch (e) {
        req.flash(`error`, e.message);
        res.redirect(`register`)

    }
}))
router.get(`/login`, async function (req, res) {
    res.render(`users/login`);
})
router.post(`/login`, storeReturnTo, passport.authenticate(`local`, { failureFlash: true, failureRedirect: `/login` }), async function (req, res) {
    req.flash(`success`, `Welcome Back!!`)
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
})


module.exports = router;