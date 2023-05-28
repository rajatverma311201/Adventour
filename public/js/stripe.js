const stripe = Stripe(
    'pk_test_51MZJMlSBDGjg0eAodMv6bGCeBeWMP2bvQEQpxQ4r06ieIpcOoEfm5t14jmfjq1mgQ12zN2VZ0s4VwXOoqlefKCqJ00wW4O14KK'
);

export const bookTour = async (tourId) => {
    try {
        console.log(tourId, 'bookTourCalled');
        const axiosResponse = await axios({
            method: 'get',
            url: `/api/v1/bookings/checkout-session/${tourId}`,
        });
        console.log(axiosResponse);
        const session = axiosResponse.data.session;
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err.response.data.message);
    }
};
