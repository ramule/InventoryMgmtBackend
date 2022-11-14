function cb(resCode, resMsg, resBody) {
    let resJson = {
        "responseCode": JSON.stringify(resCode),
        "responseMessage": resMsg,
        "responseData": JSON.stringify(resBody)
    }
    return resJson;
}

module.exports = cb;