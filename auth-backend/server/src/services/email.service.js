const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (mailOptions) => {
  const res = await transporter.sendMail(mailOptions);
  return res;
};

module.exports = {
  sendEmail,
};
