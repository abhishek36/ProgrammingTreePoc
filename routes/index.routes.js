module.exports = (app) => {
  let uploadRoute = require("./upload.routes");
  let userRoute = require("./user.routes");
  let addressRoute = require("./address.routes");
  let documentRoute = require("./document.routes");


  app.use("/api/v1/upload", uploadRoute);
  app.use("/api/v1/", userRoute);
  app.use("/api/v1/address", addressRoute);
  app.use("/api/v1/document", documentRoute);
};