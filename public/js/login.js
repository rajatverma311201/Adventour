// const { default: axios } = require("axios");

document.querySelector('.form-login').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
});

// document.querySelector('.nav__el--logout').addEventListener('click', logout);
const login = async (email, password) => {
    try {
        const axiosResponse = await axios({
            method: 'POST',
            url: 'api/v1/users/login',
            data: {
                email: email,
                password: password,
            },
        });

        if (axiosResponse.data.status === 'success') {
            showAlert('success', 'Logged in Succesfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 500);
        }
    } catch (err) {
        console.log(err);
        showAlert('error', err.response.data.message);
    }
};

const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 1000);
};

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
