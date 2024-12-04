import nodemailer from "nodemailer";

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
    from: { name: "TechFusion'25", address: process.env.GMAIL_USER },
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
        TechFusion'25<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
  };
  return await sendEmail(mailOptions);
};

// Method to send onboarding email
export const sendOnboardingEmail = async (email, username) => {
  const mailOptions = {
    from: { name: "TechFusion'25", address: process.env.GMAIL_USER },
    to: email,
    subject: "Welcome to TechFusion!",
    html: `
      <div dir="ltr">
    <div>
        <table id="m_3750781096583094956u_body"
            style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;min-width:320px;Margin:0 auto;background-color:#f9f9f9;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align:top">
                    <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
                        <div id="m_3750781096583094956u_row_10"
                            style="padding:0px;background-image:url('https://ci3.googleusercontent.com/meips/ADKq_NZ8-MyeNXZtuMS6NPohLQxkihJgya7Ww93vCrUBwV0YBznjK68eTnOvEDYa5XEGIFHTCcKsfJvAzxHmsXv-WgQStFS-Q10r0A=s0-d-e1-ft#https://share1.cloudhq-mkt3.net/d67be3826a40e0.png');background-repeat:no-repeat;background-position:center top;background-color:transparent">
                            <div
                                style="margin:0 auto;min-width:320px;max-width:600px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                                <div
                                    style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
                                    <div style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
                                        <div style="height:100%;width:100%!important;border-radius:0px">
                                            <div
                                                style="box-sizing:border-box;height:100%;padding:0px;border-top:0px solid transparent;border-left:0px solid transparent;border-right:0px solid transparent;border-bottom:0px solid transparent;border-radius:0px">

                                                <table id="m_3750781096583094956u_content_image_7"
                                                    style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:47px 10px 10px;font-family:'Cabin',sans-serif"
                                                                align="left">

                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right:0px;padding-left:0px"
                                                                                align="center">

                                                                                <img align="center" border="0"
                                                                                    src="https://i.imgur.com/YZFxP7B.png"
                                                                                    alt="" title=""
                                                                                    style="outline:none;text-decoration:none;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:60%;max-width:348px"
                                                                                    width="348">

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="m_3750781096583094956u_row_7"
                            style="padding:0px;background-image:url('https://ci3.googleusercontent.com/meips/ADKq_NauOnt78wi5eYyuYhQf2oVSUA_YmP3xD94TbyDO3nKUA9G8GAiztwM7xPrpl9ljdz8mzlHSS5hsBoMRClqbDb9ejGN9EA2a5A=s0-d-e1-ft#https://share1.cloudhq-mkt3.net/7c0fb120c68385.png');background-repeat:no-repeat;background-position:center center;background-color:transparent">
                            <div
                                style="margin:0 auto;min-width:320px;max-width:600px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                                <div
                                    style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">

                                    <div style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
                                        <div style="height:100%;width:100%!important;border-radius:0px">
                                            <div
                                                style="box-sizing:border-box;height:100%;padding:0px;border-top:0px solid transparent;border-left:0px solid transparent;border-right:0px solid transparent;border-bottom:0px solid transparent;border-radius:0px">

                                                <table id="m_3750781096583094956u_content_image_3"
                                                    style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:44px 10px 10px;font-family:'Cabin',sans-serif"
                                                                align="left">

                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right:0px;padding-left:0px"
                                                                                align="center">

                                                                                <img align="center" border="0"
                                                                                    src="https://ci3.googleusercontent.com/meips/ADKq_NZuyFoC-d5afjyOa9jq1jAQGEMWIUfWAzsFQ5-2NIshawvzoXI5IqYf9tAGlaUyJa_aJxCcZoFCWmZKld5GX0JKslTEW5K7Kw=s0-d-e1-ft#https://share1.cloudhq-mkt3.net/0942e8adcbcc9d.png"
                                                                                    alt="" title=""
                                                                                    style="outline:none;text-decoration:none;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:100%;max-width:520px"
                                                                                    width="520">

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="m_3750781096583094956u_content_heading_1"
                                                    style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px 60px;font-family:'Cabin',sans-serif;color:#6e00be"
                                                                align="left">


                                                                <h1
                                                                    style="margin:0px;line-height:140%;text-align:left;word-wrap:break-word;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:400">
                                                                    <div>
                                                                        <div><strong>Dear ${username},</strong></div>
                                                                        <div>&nbsp;</div>
                                                                    </div>
                                                                    <span><span>Welcome to </span></span>TechFusion'25!
                                                                    We are excited to have you on board. Our platform
                                                                    offers you a seamless way to manage your event
                                                                    participation and explore all that TechFusion has to
                                                                    offer.
                                                                    <div>
                                                                        <div>&nbsp;</div>
                                                                        <div>You can log in and explore our platform
                                                                            here:</div>
                                                                    </div>
                                                                </h1>


                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px;font-family:'Cabin',sans-serif"
                                                                align="left">


                                                                <div align="center">

                                                                    <a href="https://techfusion.org.in"
                                                                        style="box-sizing:border-box;display:inline-block;text-decoration:none;text-align:center;color:#ffffff;background-color:#222222;border-radius:4px;width:auto;max-width:100%;word-break:break-word;word-wrap:break-word;font-family:book antiqua,palatino;font-size:14px"
                                                                        target="_blank"
                                                                        data-saferedirecturl="https://www.google.com/url?q=https://techfusion.org.in&amp;source=gmail&amp;ust=1732572358865000&amp;usg=AOvVaw3udtia-kJKj1kVbtKS68QR">
                                                                        <span
                                                                            style="display:block;padding:10px 20px;line-height:120%"><span
                                                                                style="line-height:16.8px">Log
                                                                                in</span></span>
                                                                    </a>

                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px;font-family:'Cabin',sans-serif"
                                                                align="left">

                                                                <table height="0px" align="center" border="0"
                                                                    cellpadding="0" cellspacing="0" width="76%"
                                                                    style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;border-top:2px solid #6e00be">
                                                                    <tbody>
                                                                        <tr style="vertical-align:top">
                                                                            <td
                                                                                style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0px;line-height:0px">
                                                                                <span>&nbsp;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="m_3750781096583094956u_content_heading_8"
                                                    style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:4px 60px 3px;font-family:'Cabin',sans-serif;color:#6e00be"
                                                                align="left">


                                                                <h1
                                                                    style="margin:0px;line-height:140%;text-align:left;word-wrap:break-word;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:400">
                                                                    <div>Please note, your account is currently in a
                                                                        <span
                                                                            style="text-decoration:underline">pending</span>
                                                                        state.
                                                                    </div>
                                                                    <div>While your account is under verification, you
                                                                        can still log in and familiarize yourself with
                                                                        the platform. Account verification typically
                                                                        takes 24-72 hours after registration.</div>
                                                                    <div>&nbsp;</div>
                                                                    <div>If you have any questions or require
                                                                        assistance, feel free to reach out to us at any
                                                                        time.</div>
                                                                    <div>&nbsp;</div>
                                                                </h1>


                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div id="m_3750781096583094956u_row_9"
                            style="padding:0px;background-image:url('https://ci3.googleusercontent.com/meips/ADKq_NZ-afmRsGrad3WstcJdFnmIxLbvH_u9x0k4G5UwYSA6lSPKqkIhAW4X8hd4Z5YJ3BNFnambBSVeCVHCCK7PbFHakXFTq-li_g=s0-d-e1-ft#https://share1.cloudhq-mkt3.net/f90381772bfc82.png');background-repeat:no-repeat;background-position:center bottom;background-color:transparent">
                            <div
                                style="margin:0 auto;min-width:320px;max-width:600px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                                <div
                                    style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
                                    <div style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
                                        <div style="height:100%;width:100%!important;border-radius:0px">
                                            <div
                                                style="box-sizing:border-box;height:100%;padding:0px;border-top:0px solid transparent;border-left:0px solid transparent;border-right:0px solid transparent;border-bottom:0px solid transparent;border-radius:0px">

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:3px 10px 13px;font-family:'Cabin',sans-serif"
                                                                align="left">


                                                                <div align="center">

                                                                    <a href="https://www.techfusion.org.in/contact-us"
                                                                        style="box-sizing:border-box;display:inline-block;text-decoration:none;text-align:center;color:#ffffff;background-color:#222222;border-radius:4px;width:auto;max-width:100%;word-break:break-word;word-wrap:break-word;font-family:book antiqua,palatino;font-size:14px"
                                                                        target="_blank"
                                                                        data-saferedirecturl="https://www.google.com/url?q=https://www.techfusion.org.in/contact-us&amp;source=gmail&amp;ust=1732572358865000&amp;usg=AOvVaw08KOjSuj8lGJE8mmAGKpEv">
                                                                        <span
                                                                            style="display:block;padding:10px 20px;line-height:120%"><span
                                                                                style="line-height:16.8px">Contact
                                                                                Us</span></span>
                                                                    </a>

                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px 60px;font-family:'Cabin',sans-serif;color:#6e00be"
                                                                align="left">


                                                                <h1
                                                                    style="margin:0px;line-height:140%;text-align:center;word-wrap:break-word;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:400">
                                                                    <span>Thank you for choosing TechFusion. We look
                                                                        forward to seeing you at the event!</span>
                                                                </h1>


                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px 60px;font-family:'Cabin',sans-serif;color:#6e00be"
                                                                align="left">


                                                                <h1
                                                                    style="margin:0px;line-height:140%;text-align:left;word-wrap:break-word;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:400">
                                                                    <div>Best regards,</div>
                                                                    <div><strong>Web Team</strong></div>
                                                                    <div>TechFusion'25</div>
                                                                    <div>Katihar Engineering College, Katihar</div>
                                                                </h1>


                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px;font-family:'Cabin',sans-serif"
                                                                align="left">

                                                                <div align="center" style="direction:ltr">
                                                                    <div style="display:table;max-width:182px">




                                                                        <table border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;margin-right:29px">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top">
                                                                                    <td valign="middle"
                                                                                        style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
                                                                                        <a href="mailto:techfestkec@gmail.com"
                                                                                            title="Email"
                                                                                            target="_blank">
                                                                                            <img src="https://ci3.googleusercontent.com/meips/ADKq_NYXsUGO5ydW_WEHvqmkkl8-9eYeIYzkTCs4m_RR8VU5shHqeCWHMB0wyVaX0twr7Ic1L0oZrEi3AtuDWofxJWi4Z_dztyksxEIEajYTOlLJaAFPWlXzIg=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png"
                                                                                                alt="Email"
                                                                                                title="Email" width="32"
                                                                                                style="outline:none;text-decoration:none;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>



                                                                        <table border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;margin-right:29px">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top">
                                                                                    <td valign="middle"
                                                                                        style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
                                                                                        <a href="https://youtube.com/@keckatihar"
                                                                                            title="YouTube"
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="https://www.google.com/url?q=https://youtube.com/@keckatihar&amp;source=gmail&amp;ust=1732572358865000&amp;usg=AOvVaw2jw9kB3simRjBjv-AMaBSO">
                                                                                            <img src="https://ci3.googleusercontent.com/meips/ADKq_Nab8BLGv9BuD2zsbxoLCdDxJwLwUW5IlgZOaaDKTI37E_nszQy0tIyxsTEETNPyBdPwi0t4C3WPhXAeRZ_cGV0d_02G-zDZXuKI4N1FFrqXa8XL10OI4gxY=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png"
                                                                                                alt="YouTube"
                                                                                                title="YouTube"
                                                                                                width="32"
                                                                                                style="outline:none;text-decoration:none;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>



                                                                        <table border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;margin-right:0px">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top">
                                                                                    <td valign="middle"
                                                                                        style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
                                                                                        <a href="https://www.instagram.com/techfusion_kec"
                                                                                            title="Instagram"
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/techfusion_kec&amp;source=gmail&amp;ust=1732572358865000&amp;usg=AOvVaw1lREu1hakjM38N-NOczJgG">
                                                                                            <img src="https://ci3.googleusercontent.com/meips/ADKq_NZHGZDB-qaPum1aK1hZ9iAfPdViSrwVBCTwNI1RSAGzOMraugiICdg4cxrC9_NHttw_3P1ug9QLOVXJw7CXZlV9ilU5xmc7M4IrUHP7pRenfC7uaQUfCBcWIjw=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png"
                                                                                                alt="Instagram"
                                                                                                title="Instagram"
                                                                                                width="32"
                                                                                                style="outline:none;text-decoration:none;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>




                                                                    </div>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px;font-family:'Cabin',sans-serif"
                                                                align="left">

                                                                <table height="0px" align="center" border="0"
                                                                    cellpadding="0" cellspacing="0" width="76%"
                                                                    style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;border-top:2px solid #6e00be">
                                                                    <tbody>
                                                                        <tr style="vertical-align:top">
                                                                            <td
                                                                                style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0px;line-height:0px">
                                                                                <span>&nbsp;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="m_3750781096583094956u_content_heading_10"
                                                    style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px 50px 5px;font-family:'Cabin',sans-serif"
                                                                align="left">


                                                                <h1
                                                                    style="margin:0px;line-height:140%;text-align:center;word-wrap:break-word;font-family:helvetica,sans-serif;font-size:10px;font-weight:400">
                                                                    <p
                                                                        style="line-height:140%;text-align:center;margin:0px">
                                                                        <span
                                                                            style="color:#363f49;line-height:19.6px">Katihar
                                                                            Engineering College, Katihar</span>
                                                                    </p>
                                                                    <p
                                                                        style="line-height:140%;text-align:center;margin:0px">
                                                                        <span
                                                                            style="color:#363f49;line-height:19.6px">Hridyaganj,
                                                                            Hajipur, Katihar&nbsp;</span>
                                                                    </p>
                                                                    <p
                                                                        style="line-height:140%;text-align:center;margin:0px">
                                                                        <span
                                                                            style="color:#363f49;line-height:19.6px">Bihar,
                                                                            India 854109</span>
                                                                    </p>
                                                                    <p
                                                                        style="line-height:140%;text-align:center;margin:0px">
                                                                        <a rel="noopener"
                                                                            href="https://www.techfusion.org.in"
                                                                            target="_blank"
                                                                            data-saferedirecturl="https://www.google.com/url?q=https://www.techfusion.org.in&amp;source=gmail&amp;ust=1732572358865000&amp;usg=AOvVaw1Gm_bSw0XiIZcERx58m_cr">www.techfusion.org.in</a>
                                                                    </p>
                                                                    <p
                                                                        style="line-height:140%;text-align:center;margin:0px">
                                                                        &nbsp;</p>
                                                                </h1>


                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Cabin',sans-serif" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-break:break-word;padding:10px 10px 60px;font-family:'Cabin',sans-serif"
                                                                align="left">

                                                                <div>

                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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
    from: { name: "TechFusion'25", address: process.env.GMAIL_USER },
    to: email,
    subject: "TechFusion Account Verified!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${username},</p>

        <p>Congratulations! Your account has been successfully verified. 
        Welcome to <strong>TechFusion'25</strong>, your gateway to managing and participating in our exciting events.</p>

        <p>You can now log in to the platform and explore all the features we offer: 
        <a href="https://techfusion.org.in/sign-in" style="color: #007BFF;">Log in here</a></p>

        <p><strong>Account Details:</strong><br/>
        Registered Email: ${email}<br/>
        TechFusion ID: ${festId}</p>

        <p>If you have any questions or need assistance, feel free to reach out to us. We’re here to help!</p>

        <p>Thank you for joining TechFusion. We look forward to your active participation in the events.</p>

        <p>Best regards,</p>
        <p><strong>Web Team</strong><br/>
        TechFusion'25<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
  };
  return await sendEmail(mailOptions);
};

// Method to send verification rejection email
export const sendVerificationUnSuccessfulEmail = async (email, username) => {
  const mailOptions = {
    from: { name: "TechFusion'25", address: process.env.GMAIL_USER },
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
        TechFusion'25<br/>
        Katihar Engineering College, Katihar</p>
      </div>
    `,
  };
  return await sendEmail(mailOptions);
};
