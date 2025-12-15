const { transporter } = require('../utils/mailHandler')
const { generateTokens } = require('../utils/authHandler')
const { generateOTP } = require('../utils/generateOTP')

async function sendVerificationMail(user) {
  let verificationOTP = await generateOTP();
  // Send verification mail
  const verificationLink = `http://localhost:5173/verify-otp?userid=${user._id}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: 'Welcome to MT Dental Clinic',
    text: `Welcome to MT Dental Clinic, your account has been created with email: ${user?.email}`,
    html: `<b>Please verify the email using the OTP ${verificationOTP} by clicking this</b><a href="${verificationLink}">verify</a>`
  };

  await transporter.sendMail(mailOptions);
  return verificationOTP;

}

async function sendForgetPasswordLink(user) {
  const { token } = await generateTokens(user, process.env.RESET_SECRET);

  // Send verification mail
  const resetPasswordLink = `http://localhost:5173/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: 'Reset Password',
    text: `Welcome to MT Dental Clinic, ${user?.email}`,
    html: `<b>Please reset password with this link by clicking this</b><a href="${resetPasswordLink}">&nbsp;Reset Password</a>`
  };

  await transporter.sendMail(mailOptions);
  return token;

}

module.exports = {
  sendVerificationMail,
  sendForgetPasswordLink
}