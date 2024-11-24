// utils/mailService.js

import nodemailer from "nodemailer";

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

// Method to send reset password email
export const sendResetPasswordEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: { name: "TechFusion'2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "Reset your TechFusion password",
    html: `<p>Click the link below to reset your TechFusion password:</p><br/>
               <p><a href="${resetUrl}">${resetUrl}</a></p><br/>
               <p><b>Ignore this mail if you haven't request to reset your password.</b></p>`,
  };
  return await sendEmail(mailOptions);
};

// Method to send onboarding email
export const sendOnboardingEmail = async (email, username) => {
  const mailOptions = {
    from: { name: "TechFusion'2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "Welcome to TechFusion!",
    html: `<p>Hi ${username}, <br/>welcome to TechFusion online platform!<br/><a href="https://techfusion.org.in">https://techfusion.org.in</a></p><br /><p>You can use our platform to manage your event participation in TechFusion online!</p><br/><br/><br/><p>Sorry, for the inconveniance but for now your account will remain in pending state, you can login and explore the platform till your account is verified!</p><br/><br/><p>Your account will be verified upon payment confirmation, usually it takes 24-72 hours.</p><br/><br/> <p>Thanks and regards,<br/>Web Team<br/>TechFusion<br/>KEC,Katihar</p>`,
  };
  return await sendEmail(mailOptions);
};

// Method to send verification confirmation email
export const sendVerificationSuccessfulEmail = async (
  email,
  username,
  festId
) => {
  const mailOptions = {
    from: { name: "TechFusion'2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "TechFusion account verified!",
    html: `<p>Hi ${username}, <br/>welcome to TechFusion online platform!<br/><a href="https://techfusion.org.in">https://techfusion.org.in</a></p><br /><p>You can use our platform to manage your event participation in TechFusion online!</p><br/><br/><br/><p>Your account have been verified successfully, you can <a href="https://techfusion.org.in/sign-in">login</a> and explore the platform as well as participate in the events.<br/><br/>Registered Email: ${email}<br/>TechFusion Id: ${festId}</p><br/><br/> <p>Thanks and regards,<br/>Web Team<br/>TechFusion<br/>KEC,Katihar</p>`,
  };
  return await sendEmail(mailOptions);
};

// Method to send verification rejection email
export const sendVerificationUnSuccessfulEmail = async (email, username) => {
  const mailOptions = {
    from: { name: "TechFusion'2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "TechFusion account verification failed!",
    html: `<p>Hi ${username}, <br/>Your payment verification for participating in TechFusion have failed, and hence your account have been deleted from our platform.<br/> For any help contact us at <a href="https://techfusion.org.in/contact-us">https://techfusion.org.in/contact-us</a><br/><br/><br/>Think this is a mistake, Possible reason for rejection:<br/><ol><li>Payment Screenshot uploaded is either blurry or wrong.</li><li>The transection id of payment isn't clearly visible in the payment screenshot.</li></ol><br/><br/>You can always re-register by signing up with correct details at <a href="https://techfusion.org.in//registration">https://techfusion.org.in//registration</a></p><br/> <p>Thanks and regards,<br/>Web Team<br/>TechFusion<br/>KEC,Katihar</p>`,
  };
  return await sendEmail(mailOptions);
};
