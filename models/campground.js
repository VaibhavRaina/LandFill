const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const Review = require(`./review`);
const { fileLoader } = require("ejs");
const { func, number } = require("joi");
const opts={toJSON:{virtuals:true}};

const ImageSchema = new Schema(
    {
        url: String,
        filename: String,
    }
)
ImageSchema.virtual(`thumbnail`).get(function () {
    return this.url.replace(`/upload`, `/upload/w_200`)
})


const campGroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    images: [ImageSchema],
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: `User`

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: `Review`
        }
    ],
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
},opts);

campGroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        });
    }
});

campGroundSchema.virtual(`properties.popUpMarkup`).get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,20)}...</p>`
})




module.exports = mongoose.model(`Campground`, campGroundSchema);