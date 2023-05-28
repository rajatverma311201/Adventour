document.querySelector('#logoutUser').addEventListener('click', () => {
    // console.log('Hello');
    logout();
});

const showAlertLogout = (type, msg) => {
    hideAlertLogout();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlertLogout, 1500);
};

const hideAlertLogout = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

const logout = async () => {
    try {
        const axiosResponse = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });
        // console.log(axiosResponse.data);
        if (axiosResponse.data.status === 'success') {
            showAlertLogout('success', 'Logged Out');
            window.setTimeout(() => {
                location.assign('/');
            }, 500);
        }
    } catch (err) {
        console.log(err);
        showAlertLogout('error', err.response.data.message);
    }
};
