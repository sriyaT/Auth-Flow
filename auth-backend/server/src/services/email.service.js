const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ from, to, subject, text }) => {
  return await resend.emails.send({
    from,
    to,
    subject,
    html: `
      <div style="font-family:sans-serif">
        <p>${text}</p>
      </div>
    `,
  });
};

module.exports = {
  sendEmail,
};
