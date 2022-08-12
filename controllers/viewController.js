const Tour = require('./../models/tourModel');
const axios = require('axios');
module.exports = {
    overview: async function (req, res) {
        const tours = await Tour.find();

        res.render('overview.ejs', {
            title: 'Overview',
            tours,
        });
        // res.status(200).json(tours);
    },
    getTour: async function (req, res) {
        const currTour = await Tour.findOne({ slug: req.params.slug }).populate(
            {
                path: 'reviews',
                fields: 'review rating user',
            }
        );

        res.render('tour.ejs', { tour: currTour });
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login.ejs');
    },
};
