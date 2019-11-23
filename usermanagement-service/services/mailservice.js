var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
   port: 465,
  auth: {
    user: 'catieapp@gmail.com',
    pass: 'test@catie'
  }
});
module.exports = transporter;
