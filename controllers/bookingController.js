const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.tourId);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],

        success_url: `${req.protocol}://${req.get('host')}/?tour=${
            req.params.tourId
        }&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,

        mode: 'payment',

        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${tour.name} Tour`,
                        images: [
                            `${process.env.LIVE_LINK}/img/tours/${tour.imageCover}`,
                        ],
                        description: tour.summary,
                    },

                    unit_amount: tour.price * 100,
                },

                quantity: 1,
            },
        ],
        product: {},
    });

    // Create session as response
    res.status(200).json({
        status: 'success',
        session,
    });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    try {
        const { tour, user, price } = req.query;

        // console.log(tour, user, price);
        if (!tour || !user || !price) return next();

        await Booking.create({ tour, user, price });
        // next();

        res.redirect(req.originalUrl.split('?')[0]);
    } catch (err) {
        console.log(err);
    }
});
