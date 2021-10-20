const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  var token = req.headers['x-token'];
  if (!token)
    return res.status(403).send({
      auth: false,
      message: 'Unauthorized Access'
    });
  console.log(token)
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (err)
      return res.status(500).send({
        auth: false,
        message: err
      });
    //req.username = decoded.username;
    console.log(decoded)
    next();
  });
}