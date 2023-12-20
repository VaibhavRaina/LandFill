const User = require(`../models/user`);

module.exports.renderRegister = async function (req, res) {
    res.render(`users/register`);
}
module.exports.register = async function (req, res) {
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
}

module.exports.renderLogin = async function (req, res) {
    res.render(`users/login`);
}

module.exports.login = async function (req, res) {
    req.flash(`success`, `Welcome Back!!`)
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}