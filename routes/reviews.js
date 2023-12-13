const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require(`../utils/catchAsync`);
const Campground = require('../models/campground');
const { reviewSchema } = require(`../schemas.js`)
const Review = require(`../models/review.js`);
const ExpressError = require('../utils/ExpressError');


const validateReview = function (req, res, next) {

    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(`,`);
        throw new ExpressError(msg, 400);

    } else {
        next();
    }
}


router.post(`/`, validateReview, catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash(`success`, `Successfully made a review `);
    res.redirect(`/campgrounds/${campground._id}`);


}))

router.delete(`/:reviewId`, catchAsync(async function (req, res) {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))


module.exports = router;