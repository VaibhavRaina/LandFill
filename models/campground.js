const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const Review = require(`./review`);
const { fileLoader } = require("ejs");
const { func } = require("joi");


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
    ]
})

campGroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        });
    }
});




module.exports = mongoose.model(`Campground`, campGroundSchema);