const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead',
    });
};

exports.getUserBookings = catchAsync(async (req, res, next) => {
    const userExist = await User.findById(req.params.userId);
    if (!userExist)
        return next(new AppError('No user found with the given ID', 404));

    const userBookings = await Booking.find({ user: req.params.userId });
    res.status(200).json({
        status: 'success',
        data: {
            results: userBookings.length,
            userBookings,
        },
    });
});
exports.getUserReviews = catchAsync(async (req, res, next) => {
    const userExist = await User.findById(req.params.userId);
    if (!userExist)
        return next(new AppError('No user found with the given ID', 404));

    const userReviews = await Review.find({ user: req.params.userId });
    res.status(200).json({
        status: 'success',
        data: {
            results: userReviews.length,
            userReviews,
        },
    });
});
