const twilio = require('twilio')
require('dotenv').config();
const { generateOTP } = require('../utils/generateOTP')

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

async function sendOTPVerification(phone) {
  let verificationOTP = await generateOTP();
  await client.messages.create({
    body: `Your verififcation code is ${verificationOTP}`,
    from: process.env.TWILIO_PHONE,
    to: phone
  })
  return verificationOTP;

}

module.exports = {
  sendOTPVerification,
}