const auth = require("../helper/auth")

module.exports = (app) => {
  let authRoute = require("./auth.routes");
  let uploadRoute = require("./upload.routes");
  let userRoute = require("./user.routes");
  let addressRoute = require("./address.routes");
  let documentRoute = require("./document.routes");


  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/upload", auth, uploadRoute);
  app.use("/api/v1/", auth, userRoute);
  app.use("/api/v1/address", auth, addressRoute);
  app.use("/api/v1/document", auth, documentRoute);
};