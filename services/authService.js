const fbAdmin = require('firebase-admin');

exports.verifyIdToken = async (idToken) => {
    try {
        const decodedToken = await fbAdmin.auth().verifyIdToken(idToken);

        return decodedToken;
    } catch (error) {
        console.error('Invalid ID token:', error);
        return null;
    }
};
