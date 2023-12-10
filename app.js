const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require(`ejs-mate`);
const catchAsync = require(`./utils/catchAsync`);
const Campground = require('./models/campground');
const { campGroundSchema } = require(`./schemas.js`)
let methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const { error } = require('console');
app.use(express.urlencoded({ extended: true }))
const Review = require(`./models/review.js`)
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Database connected');
});

const validateCampground = function (req, res, next) {

    const { error } = campGroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(`,`);
        throw new ExpressError(msg, 400);

    } else {
        next();
    }
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine(`ejs`, ejsMate);

app.get('/', catchAsync(async function (req, res) {
    res.render('home');
}));

app.get('/campgrounds', catchAsync(async function (req, res) {
    const campgrounds = await Campground.find({});
    res.render(`campgrounds/index`, { campgrounds })
}));
app.get('/campgrounds/new', catchAsync(async function (req, res) {
    res.render(`campgrounds/new`)
}));

app.post(`/campgrounds`, validateCampground, catchAsync(async function (req, res) {

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.get('/campgrounds/:id', catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`campgrounds/show`, { campground })
}));
app.get(`/campgrounds/:id/edit`, catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`campgrounds/edit`, { campground })
}))
app.put(`/campgrounds/:id`, catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete(`/campgrounds/:id`, catchAsync(async function (req, res) {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`)
}))


app.post(`/campgrounds/:id/review`, catchAsync(async function (req, res) {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`campground/${campground._id}`);


}))


app.all(`*`, function (req, res, next) {
    next(new ExpressError(`Page not found`, 404));
})
app.use(function (err, req, res, next) {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = `Something went wrong !`
    }
    res.status(statusCode).render(`error`, { err });

})

app.listen(8080, function () {
    console.log('Server started on Port 8080');
});
