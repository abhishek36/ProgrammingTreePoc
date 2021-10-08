let router = require("express").Router();
let multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/uploads");
    },
    filename: (req, file, callback) => {
      req.originalName = Date.now() + "-" + file.originalname;
      callback(null, req.originalName);
    },
  }),
}).any(); // for multiple upload

router.post("/", (req, res) => {
  upload(req, res, (err) => {
    var files = [];
    req.files.forEach((ele) => {
      files.push(process.env.staticFilesUrl + ele.filename);
    });
    res.send({
      status: "SUCCESS",
      files
    });
  });
});

module.exports = router;