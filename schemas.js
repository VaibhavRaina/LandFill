const joi = require(`joi`);
module.export.campgroundSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    image: joi.string().required(),
    location: joi.string().required(),
    description: joi.string().required(),
}).required()

module.export.reviewSchema = joi.object({

})