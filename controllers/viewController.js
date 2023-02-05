const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
// const axios = require('axios');
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
        
        console.log(currTour);

        res.render('tour.ejs', { tour: currTour });
        // res.status(200).send(currTour);
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login.ejs');
    },
    getMyAccountPage: async (req, res) => {
        res.status(200).render('account');
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                { email: req.body.email, name: req.body.name },
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.status(200).render('account', { user: updatedUser });
        } catch (err) {
            console.log(err);
        }
    },
};
