const Campground = require('../models/campground');

const Review = require(`../models/review.js`);


module.exports.createReview = async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash(`success`, `Successfully made a review `);
    res.redirect(`/campgrounds/${campground._id}`);


}

module.exports.updateReview = async function (req, res) {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}

