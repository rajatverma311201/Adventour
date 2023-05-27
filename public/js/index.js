import { bookTour } from './stripe.js';

const bookBtn = document.getElementById('book-tour');
if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
        console.log('book tour clicked');
        e.target.textContent = 'Processing...';
        const { tourId } = e.target.dataset;
        bookTour(tourId);
    });
}
