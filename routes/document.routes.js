const router = require("express").Router()
const commonController = require("../controller/commonController")
const response = require("../helper/response")
const MESSAGE = require("../helper/message")
const mongoose = require("mongoose")
const Document = mongoose.model("Document")

//add document
router.post("/", async (req, res) => {
    try {
        const result = await commonController.add(Document, req.body)
        response.successResponse(res, 200, MESSAGE.DOCUMENT_CREATED + result._id)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_CREATE_DOCUMENT)
    }
})

//get document by userId
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const result = await commonController.getOne(Document , {userId :userId})
        response.successResponse(res, 200, result)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.UNABLE_TO_FETCH_RECORD)
    }
})
//update document
router.put("/update/:id", async (req, res) => {
    try {
        const result = await commonController.updateByObject(Document , {userId : req.params.id} , req.body)
        response.successResponse(res, 200,  MESSAGE.DOCUMENT_UPDATED)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_UPDATE_DOCUMENT)
    }
})
//delete document
router.delete("/delete/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const result = await commonController.deleteByObject(Document ,{userId : userId})
        response.successResponse(res, 200, MESSAGE.DOCUMENT_DELETED)
    } catch (error) {
        response.successResponse(res, 400, MESSAGE.FAIL_TO_DELETE_DOCUMENT)
    }
})

module.exports = router