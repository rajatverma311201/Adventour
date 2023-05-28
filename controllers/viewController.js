const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
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
    getSignupForm: (req, res) => {
        res.status(200).render('signup.ejs');
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
    getMyTours: catchAsync(async (req, res) => {
        const bookings = await Booking.find({ user: req.user.id }).populate({
            path: 'tour',
        });

        const tourIDs = bookings.map((el) => el.tour.id);
        const tours = await Tour.find({ _id: { $in: tourIDs } });
        console.log(tours);
        res.status(200).render('overview', {
            title: 'My Tours',
            tours,
        });
    }),
};
