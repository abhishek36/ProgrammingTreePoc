module.exports = (app) => {
  let uploadRoute = require("./upload.routes");
  let userRoute = require("./user.routes");


  app.use("/api/v1/upload", uploadRoute);
  app.use("/api/v1/", userRoute);
};