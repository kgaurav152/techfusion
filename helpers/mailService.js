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
    from: { name: "TechFusion 2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "Reset Your TechFusion Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear User,</p>

        <p>We received a request to reset your password for your TechFusion account. To reset your password, please click the link below:</p>

        <p><a href="${resetUrl}" style="color: #007BFF;">Reset Password</a></p>

        <p>If the button above does not work, you can copy and paste the following link into your browser:</p>
        <p><a href="${resetUrl}" style="color: #007BFF;">${resetUrl}</a></p>

        <p><strong>Note:</strong> If you did not request a password reset, please ignore this email. Your account is secure, and no changes have been made.</p>

        <p>Thank you</p>
        <p><strong>Web Team</strong><br/>
        TechFusion 2.0<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
  };
  return await sendEmail(mailOptions);
};

// Method to send onboarding email
export const sendOnboardingEmail = async (email, username) => {
  const mailOptions = {
    from: { name: "TechFusion 2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "Welcome to TechFusion!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${username},</p>

        <p>Welcome to <strong>TechFusion 2.0</strong>! We are excited to have you on board. 
        Our platform offers you a seamless way to manage your event participation and explore all that TechFusion has to offer.</p>

        <p>You can log in and explore our platform here: 
        <a href="https://techfusion.org.in" style="color: #007BFF;">https://techfusion.org.in</a></p>

        <p>Please note, your account is currently in a pending state. While your account is under verification, you can still log in and familiarize yourself with the platform. Account verification typically takes 24-72 hours after payment confirmation.</p>

        <p>If you have any questions or require assistance, feel free to reach out to us at any time.</p>

        <p>Thank you for choosing TechFusion. We look forward to seeing you at the event!</p>

        <p>Best regards,</p>
        <p><strong>Web Team</strong><br/>
        TechFusion 2.0<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
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
    from: { name: "TechFusion 2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "TechFusion Account Verified!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${username},</p>

        <p>Congratulations! Your account has been successfully verified. 
        Welcome to <strong>TechFusion 2.0</strong>, your gateway to managing and participating in our exciting events.</p>

        <p>You can now log in to the platform and explore all the features we offer: 
        <a href="https://techfusion.org.in/sign-in" style="color: #007BFF;">Log in here</a></p>

        <p><strong>Account Details:</strong><br/>
        Registered Email: ${email}<br/>
        TechFusion ID: ${festId}</p>

        <p>If you have any questions or need assistance, feel free to reach out to us. We’re here to help!</p>

        <p>Thank you for joining TechFusion. We look forward to your active participation in the events.</p>

        <p>Best regards,</p>
        <p><strong>Web Team</strong><br/>
        TechFusion 2.0<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
  };
  return await sendEmail(mailOptions);
};

// Method to send verification rejection email
export const sendVerificationUnSuccessfulEmail = async (email, username) => {
  const mailOptions = {
    from: { name: "TechFusion 2.0", address: process.env.GMAIL_USER },
    to: email,
    subject: "TechFusion Account Verification Failed",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${username},</p>

        <p>We regret to inform you that your payment verification for participating in TechFusion was unsuccessful. As a result, your account has been removed from our platform.</p>

        <p>If you believe this is a mistake, please review the potential reasons for rejection:</p>
        <ul>
          <li>The uploaded payment screenshot was either blurry or incorrect.</li>
          <li>The transaction ID was not clearly visible in the payment screenshot.</li>
        </ul>

        <p>For assistance or to clarify this matter, feel free to contact us at:
        <a href="https://techfusion.org.in/contact-us" style="color: #007BFF;">https://techfusion.org.in/contact-us</a></p>

        <p>You are welcome to re-register on our platform with the correct details:
        <a href="https://techfusion.org.in/registration" style="color: #007BFF;">Sign up here</a></p>

        <p>We apologize for any inconvenience caused and appreciate your understanding.</p>

        <p>Best regards,</p>
        <p><strong>Web Team</strong><br/>
        TechFusion 2.0<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
  };
  return await sendEmail(mailOptions);
};
