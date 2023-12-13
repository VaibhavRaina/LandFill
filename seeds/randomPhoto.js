const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const fetch = require('node-fetch');
const { descriptors, places } = require(`./seedHelpers`)


const getRandomUnsplashPhoto = async () => {
    const accessKey = 'sUP9oMsEt1IgVmRKXzphRiK-9-AMG_7hYh3OXkNxIxs';
    const apiUrl = 'https://api.unsplash.com/photos/random';
    const response = await fetch(`${apiUrl}?client_id=${accessKey}`);
    const data = await response.json();
    module.exports.imageUrl = data.urls.regular;

}

getRandomUnsplashPhoto();
