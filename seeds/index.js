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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 1;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://random.responsiveimages.io/v1/docs',
            description: `An amazing spot to enjoy your vacation !!`,
            author: '657dd978950d54a397c1582b',
            price: price,
            images: [
                {
                    url: 'https://random.responsiveimages.io/v1/docs',
                    filename: `image1`
                },

                {
                    url: 'https://random.responsiveimages.io/v1/docs',
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



