const router = require("express").Router()
const commonController = require("../controller/commonController")
const response = require("../helper/response")
const MESSAGE = require("../helper/message")
const mongoose = require("mongoose")
const Address = mongoose.model("Address")

//add address
router.post("/", async (req, res) => {
    try {
        const result = await commonController.add(Address, req.body)
        response.successResponse(res, 200, MESSAGE.ADDRESS_CREATED + result._id)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_CREATE_ADDRESS)
    }
})

//get address by userId
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const result = await commonController.getOne(Address , {userId :userId})
        response.successResponse(res, 200, result)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.UNABLE_TO_FETCH_RECORD)
    }
})
//update address
router.put("/update/:id", async (req, res) => {
    try {
        const userId= req.params.id
        const result = await Address.findOneAndUpdate({userId : userId} , req.body)
        response.successResponse(res, 200, MESSAGE.UPDATE_DELETED)
    } catch (error) {
        console.log("error" ,error)
        response.successResponse(res, 400, MESSAGE.FAIL_TO_UPDATE_ADDRESS)
    }
})
//delete address
router.delete("/delete/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const result = await Address.findOneAndUpdate({userId : userId} ,{status : "deleted"})
        response.successResponse(res, 200, MESSAGE.ADDRESS_DELETED)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_DELETE_ADDRESS)
    }
})

module.exports = router