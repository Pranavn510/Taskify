import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Yahoo, Outlook, etc.
  auth: {
    user: "pranavn5402@gmail.com", // Your email id
    pass: " jprr byjj wwiu dthp", // Your password
  },
});

export const sendMail = (recipient, subject, text) => {
  const mailOptions = {
    from: "pranavn5402@gmail.com",
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log("Email sent: " + info.response);
  });
};

// module.exports = sendMail;
