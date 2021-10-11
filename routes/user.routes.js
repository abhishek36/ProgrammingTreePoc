const router = require("express").Router()
const commonController = require("../controller/commonController")
const response = require("../helper/response")
const MESSAGE = require("../helper/message")
const mongoose = require("mongoose")
const User = mongoose.model("User")

//add user
router.post("/user", async (req, res) => {
    try {
        const result = await commonController.add(User, req.body)
        const responseObj = {
            message: MESSAGE.USER_REGISTER + result._id,
            userId: result._id
        }
        response.successResponse(res, 200, responseObj)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.USER_REGISTER_FAIL)
    }
})

//get form details
router.get("/form/:id", async (req, res) => {
    try {
        const result = await User.aggregate([{
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                },
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "userId",
                    as: "address",
                }
            },
            {
                $unwind: "$address"
            },
            {
                $lookup: {
                    from: "documents",
                    localField: "_id",
                    foreignField: "userId",
                    as: "document",
                }
            },
            {
                $unwind: "$document"
            },
            {
                $project: {
                    "_id": "$_id",
                    "firstName": "$firstName",
                    "middleName": "$middleName",
                    "lastName": "$lastName",
                    "email": "$email",
                    "mobile": "$mobile",
                    "gender": "$gender",
                    "age": "$age",
                    "avatar": "$document.avatar",
                    "sign": "$document.sign",
                    "temporaryAddress": {
                        "address": "$address.temporaryAddress.address",
                        "state": "$address.temporaryAddress.state",
                        "city": "$address.temporaryAddress.city",
                        "area": "$address.temporaryAddress.area",
                        "street": "$address.temporaryAddress.street",
                        "pincode": "$address.temporaryAddress.pincode",
                    },
                    "permanentAddress": {
                        "address": "$address.permanentAddress.address",
                        "state": "$address.permanentAddress.state",
                        "city": "$address.permanentAddress.city",
                        "area": "$address.permanentAddress.area",
                        "street": "$address.permanentAddress.street",
                        "pincode": "$address.permanentAddress.pincode",
                    },

                }
            }
        ])
        response.successResponse(res, 200, result)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.UNABLE_TO_FETCH_RECORD)
    }
})

//get user list
router.get("/user/list", async (req, res) => {
    try {
        var {
            page = 1,
                limit = 10
        } = req.query;
        const result = await User.find({status : {$ne : "deleted"}}).limit(limit * 1).skip((page - 1) * limit)
        response.successResponse(res, 200, result)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.UNABLE_TO_FETCH_RECORD)
    }
})

//get user by id
router.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await commonController.getOne(User , {_id :id})
        response.successResponse(res, 200, result)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.UNABLE_TO_FETCH_RECORD)
    }
})
//update user
router.put("/user/update/:id", async (req, res) => {
    try {
        const result = await commonController.updateBy(User , req.params.id , req.body)
        response.successResponse(res, 200, MESSAGE.UPDATE_USER)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_UPDATE_USER)
    }
})
//delete user
router.delete("/user/delete/:id", async (req, res) => {
    try {
        const result = await commonController.delete(User , req.params.id)
        response.successResponse(res, 200, MESSAGE.USER_DELETED)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_USER_DELETED)
    }
})
module.exports = router