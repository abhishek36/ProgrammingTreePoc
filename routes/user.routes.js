const router = require("express").Router()
const commonController = require("../controller/commonController")
const response = require("../helper/response")
const MESSAGE = require("../helper/message")
const mongoose = require("mongoose")
const User = mongoose.model("User")
const Address = mongoose.model("Address")
const Document = mongoose.model("Document")

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

//add address
router.post("/address", async (req, res) => {
    try {
        const result = await commonController.add(Address, req.body)
        response.successResponse(res, 200, MESSAGE.ADDRESS_CREATED + result._id)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_CREATE_ADDRESS)
    }
})

//add document
router.post("/document", async (req, res) => {
    try {
        const result = await commonController.add(Document, req.body)
        response.successResponse(res, 200, MESSAGE.DOCUMENT_CREATED + result._id)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_CREATE_DOCUMENT)
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

module.exports = router