// const { default: axios } = require("axios");

document.querySelector('.form-signup').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    console.log(name, email, password, passwordConfirm);
    signup(name, email, password, passwordConfirm);
});

// document.querySelector('.nav__el--logout').addEventListener('click', logout);
const signup = async (name, email, password, passwordConfirm) => {
    try {
        const axiosResponse = await axios({
            method: 'POST',
            url: 'api/v1/users/signup',
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            },
        });

        if (axiosResponse.data.status === 'success') {
            showAlert('success', 'Account created Succesfully!');
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
    window.setTimeout(hideAlert, 1500);
};

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
