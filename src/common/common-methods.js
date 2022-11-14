const jwt = require("jsonwebtoken");

validateAuthToken = async(token) => {

    if(!token) {
        return;
    }
    try {
        const verify = await jwt.verify(token, process.env.SECRET_KEY);
        return verify;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    validateAuthToken: validateAuthToken
}