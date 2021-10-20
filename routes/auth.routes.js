const router = require("express").Router()
const commonController = require("../controller/commonController")
const response = require("../helper/response")
const MESSAGE = require("../helper/message")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Authentication = mongoose.model("Authentication")

//add Authentication
router.post("/register", async (req, res) => {
    try {
        var data = req.body
        const checkForUser = await commonController.getOne(Authentication, { email: data.email })
        if (checkForUser) {
            response.successResponse(res, 200, MESSAGE.ALREADY_EXIST)
        }
        else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(data.password, salt, async function (err, hash) {
                    data["password"] = hash
                    const result = await commonController.add(Authentication, data)
                    const token = jwt.sign({
                        userId: result._id,
                        email: result.email,
                        date: new Date()
                    }, process.env.secret);
                    response.successResponse(res, 200, { message: MESSAGE.AUTHENTICATION_CREATED, token: token })
                });
            });
        }
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_REGISTER)
    }
})

router.post("/login", async (req, res) => {
    try {
        const data = await commonController.getOne(Authentication, { email: req.body.email })
        if (data) {
            bcrypt.compare(req.body.password, data.password, function (
                err,
                result
            ) {
                if (result) {
                    const token = jwt.sign({
                        userId: data._id,
                        email: data.email,
                        date: new Date()
                    }, process.env.secret);
                    response.successResponse(res, 200, { message: MESSAGE.LOGIN_SUCCESSFULLY, token: token })
                }
                else {
                    response.successResponse(res, 200, MESSAGE.INCORRECT_EMAIL_OR_PASSWORD)
                }
            })
        }
        else {
            response.successResponse(res, 400, MESSAGE.NO_REGISTRATION_FOUND)
        }
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_REGISTER)
    }
})

module.exports = router