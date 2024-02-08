const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require(`./seedHelpers`)

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Database connected');
});

const sample = function (array) {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 1;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',

            description: `An amazing spot to enjoy your vacation`,
            author: '657dd978950d54a397c1582b',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtemmbo4i/image/upload/v1707425133/Yelpcamp/fknawl8hrkybvajsg7qz.jpg',
                    filename: `image1`
                },

                {
                    url: 'https://res.cloudinary.com/dtemmbo4i/image/upload/v1707428462/download_1_ow0uw8.jpg',
                    filename: `image2`
                }
            ]
        })
        await camp.save();
    }

}


seedDb().then((result) => {
    mongoose.connection.close();
}).catch((err) => {
    console.log(err);
});



