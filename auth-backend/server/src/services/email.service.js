const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ from, to, subject, text }) => {
  try {
    const response = await resend.emails.send({
      from,
      to,
      subject,
      html: `
        <div style="font-family:sans-serif">
          <p>${text}</p>
        </div>
      `,
    });

    console.log("Resend response:", response);

    return response;
  } catch (err) {
    console.error("Resend Error:");
    console.error(err);
    throw err;
  }
};

module.exports = { sendEmail };
