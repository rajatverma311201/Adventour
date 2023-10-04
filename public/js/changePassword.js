// const { default: axios } = require("axios");

document
    .querySelector('.form-change-password')
    .addEventListener('submit', (event) => {
        event.preventDefault();
        const passwordCurrent =
            document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm =
            document.getElementById('password-confirm').value;
        // login(email, password);
        changePassword(passwordCurrent, password, passwordConfirm);
    });

// document.querySelector('.nav__el--logout').addEventListener('click', logout);
const changePassword = async (passwordCurrent, password, passwordConfirm) => {
    try {
        const axiosResponse = await axios({
            method: 'PATCH',
            url: 'api/v1/users/update-my-password',
            data: {
                passwordCurrent: passwordCurrent,
                password: password,
                passwordConfirm: passwordConfirm,
            },
        });

        if (axiosResponse.data.status === 'success') {
            showAlert('success', 'Password Changed Succesfully!');
            window.setTimeout(() => {
                location.assign('/me');
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
