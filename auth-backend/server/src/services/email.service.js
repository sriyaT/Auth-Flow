const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4, // 👈 Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.verify();
    console.log("SMTP Connected");

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (err) {
    console.error("SMTP ERROR");
    console.error(err);
    throw err;
  }
};

module.exports = {
  sendEmail,
};
