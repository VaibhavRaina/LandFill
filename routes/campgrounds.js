const express = require('express');
const router = express.Router();
const catchAsync = require(`../utils/catchAsync`);
const Campground = require('../models/campground');
const { campgroundSchema } = require(`../schemas.js`)
const ExpressError = require('../utils/ExpressError');
const { error } = require('console');
const { isLoggedIn } = require(`../middleware.js`);

const validateCampground = function (req, res, next) {

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(`,`);
        throw new ExpressError(msg, 400);

    } else {
        next();
    }
}



router.get('/', isLoggedIn, catchAsync(async function (req, res) {
    const campgrounds = await Campground.find({});
    res.render(`campgrounds/index`, { campgrounds })
}));
router.get('/new', isLoggedIn, catchAsync(async function (req, res) {
    res.render(`campgrounds/new`)
}));

router.post(`/`, isLoggedIn, validateCampground, catchAsync(async function (req, res) {

    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash(`success`, `Success In Creating A Campground `);
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate(`reviews`);
    if (!campground) {
        req.flash(`error`, `No Campground Found `);
        return res.redirect(`/campgrounds`);
    }
    res.render(`campgrounds/show`, { campground })
}));
router.get(`/:id/edit`, isLoggedIn, catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash(`error`, `No Campground Found `);
        return res.redirect(`/campgrounds`);
    }
    res.render(`campgrounds/edit`, { campground })
}))
router.put(`/:id`, isLoggedIn, validateCampground, catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    req.flash(`success`, `Successfully Updated a Campground `);
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete(`/:id`, isLoggedIn, catchAsync(async function (req, res) {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash(`success`, `Successfully deleted a campground `);
    res.redirect(`/campgrounds`)
}))

module.exports = router;
