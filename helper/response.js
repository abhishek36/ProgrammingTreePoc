module.exports = {
    successResponse: (res, code, resData) => {
        res.status(code).json({
            status: 'SUCCESS',
            code: code,
            data: resData
        });
    },
    errorMsgResponse: (res, code, resData) => {
        res.status(code).json({
            status: 'ERROR',
            code: code,
            message: resData
        });
    },
}