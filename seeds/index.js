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
    for (let i = 0; i < cities.length; i++) {
        const random1000 = Math.floor(Math.random() * 999);
        const price = Math.floor(Math.random() * 100) + 1;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://random.responsiveimages.io/v1/docs',
            description: `An amazing spot to enjoy your vacation !!`,
            price: price,
        })
        await camp.save();
    }

}


seedDb().then((result) => {
    mongoose.connection.close();
}).catch((err) => {
    console.log(err);
});



// https://api.unsplash.com/photos/random?client_id=sUP9oMsEt1IgVmRKXzphRiK-9-AMG_7hYh3OXkNxIxs