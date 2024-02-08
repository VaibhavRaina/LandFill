if (process.env.NODE_ENV !== `production`) {
    require(`dotenv`).config();
}


const express = require('express');
const router = express.Router();
const catchAsync = require(`../utils/catchAsync`);
const Campground = require('../models/campground');
const { campgroundSchema } = require(`../schemas.js`)
const ExpressError = require('../utils/ExpressError');
const { error } = require('console');
const { isLoggedIn, isAuthor, validateCampground } = require(`../middleware.js`);
const campground = require(`../controllers/campgrounds.js`);
const multer = require(`multer`);
const { storage } = require(`../cloudinary`);
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campground.index))
    .post(isLoggedIn, upload.array(`image`), validateCampground, catchAsync(campground.createCampground));





router.get('/new', isLoggedIn, campground.renderNewForm);
router.get('/buy', campground.buy); 
router.get('/buyed', campground.buyed);
router.get('/sell', campground.sell); 
router.get('/sold', campground.sold);




router.route('/:id')
    .get(catchAsync(campground.showCampground))
    .put(isLoggedIn, isAuthor, upload.array(`image`), validateCampground, catchAsync(campground.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground));

 router.route('/:id/bids')
    .get(catchAsync(campground.bidsCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.renderEditForm));

module.exports = router;
