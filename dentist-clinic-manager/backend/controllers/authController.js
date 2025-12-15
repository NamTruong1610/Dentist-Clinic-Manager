const { User } = require('../models/userModels')
const { findUser, findAllUsers, createUserOrUpdate } = require('../services/authServices')
const { sendVerificationMail, sendForgetPasswordLink } = require('../services/mailServices')
const { sendOTPVerification } = require('../services/smsService');
const { generateTokens, generateDecodedToken } = require('../utils/authHandler')
const ErrorHandler = require('../utils/errorHandler')
const { hashPassword, comparePasswords } = require('../utils/hashPassword');
const { isFieldErrorFree } = require('../utils/isFieldErrorFree')
const jwt = require('jsonwebtoken')

exports.getUserByIdController = async (req, res, next) => {
  // Extracting the id
  const userId = req.user.id;
  try {
    const user = await findUser({ id: userId }, [
      '-password',
      '-refreshToken',
      '-otp',
      '-__v'
    ]);

    // If user does not exist
    if (!user) {
      throw new ErrorHandler('User with this id not found!');
    }
    res.status(200).json({
      message: 'User fetched success',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers({});
    res.status(200).json({
      message: 'User fetched success',
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

exports.registerController = async (req, res, next) => {
  // Data sanitization against site script XSS and validate
  await isFieldErrorFree(req, res);
  const { username, password, email, role, phone } = req.body;
  try {
    const userExist = await findUser({ email, username });
    if (userExist) {
      throw new ErrorHandler('User with Email or Username already exist', 400);
    }
    // Hash user's password
    const hashedPassword = await hashPassword(password);

    // Store User
    const savedData = await createUserOrUpdate({
      email,
      username,
      password: hashedPassword,
      role: role,
      phone
    });

    // Sending Mail
    const verificationOTP = await sendVerificationMail(savedData);
    console.log(verificationOTP, 'from verification');

    // Updateing OTP in the existing user
    const updatedData = await createUserOrUpdate(
      {
        otp: verificationOTP
      },
      savedData
    );

    res.status(201).json({
      error: false,
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }

}

exports.loginController = async (req, res, next) => {
  const { username, password, email } = req.body;
  // Service function to find data from email or username
  try {
    const user = await findUser({ email, username });
    if (!user) {
      throw new ErrorHandler('User or Email not exist!', 401);
    }

    const passwordsMatched = await comparePasswords(password, user.password);

    if (!passwordsMatched) {
      throw new ErrorHandler('Incorrect password!', 401);
    }

    const { token, refreshToken } = await generateTokens(user, 'LOGIN_SECRET');


    // Updateing Refresh Token in the existing user
    const updatedData = await createUserOrUpdate(
      {
        refreshToken: refreshToken,
      },
      user
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true
    })

    res.status(201).json({
      error: false,
      data: updatedData,
      accessToken: token,
      token: refreshToken
    });
  } catch (error) {
    next(error);
  }

}

exports.refreshTokenController = async (req, res, next) => {
  const refreshToken = req.cookie.refreshToken || req.body.refreshToken;

  // If no refresh token

  if (!refreshToken) {
    throw new ErrorHandler('Refresh Token not found!', 401);
  }

  try {
    // Verify the incoming refresh token required token and secret key
    const { err, decoded } = await generateDecodedToken(refreshToken, 'LOGIN_SECRET')

    if (Boolean(err)) {
      throw new ErrorHandler('Invalid Token', 401)
    }

    // Find the user associated with refresh token
    const user = await User.findById(decoded?.data?.id)

    // If user isn't found, deny access
    if (!user) {
      throw new ErrorHandler('User not found!', 404)
    }

    // If the stored refresh token doesn't match the incoming, deny access
    if (user?.refreshToken !== refreshToken) {
      throw new ErrorHandler('Refresh Token is not valid', 401);
    }

    const { token: accessToken } = await generateTokens(user, 'LOGIN_SECRET');

    // Set options
    let cookieOptions = {
      httpOnly: true,
      secure: true,
    }

    // Clear existing cookie
    res.clearCookie('accessToken', cookieOptions)

    // Set the new tokens in the cookies
    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .json({ accessToken, message: 'Access Token Generated' })

    console.log(err, decoded);
  } catch (error) {
    next(error)
  }
}

exports.verifyMailController = async (req, res, next) => {
  // await isFieldErrorFree(req, res);
  const { otp, userId } = req.body;
  try {
    const user = await findUser({ id: userId })
    // If user does not exist
    if (!user) {
      throw new ErrorHandler('User with this id not found!');
    }
    if (user.otp !== otp) {
      throw new ErrorHandler('OTP does not match');
    }
    // Updating the email_verified
    let response = await createUserOrUpdate({ email_verified: true }, user)
    res.status(200).json({ response, message: 'Access Token Generated!' })
  } catch (error) {
    next(error)
  }
}
exports.forgetPasswordController = async (req, res, next) => {
  // Receive email
  const { email } = req.body;
  try {
    // Service function to find data from email or username
    const user = await findUser({ email });
    if (!user) {
      throw new ErrorHandler('User or Email not exist!', 401);
    }

    // Sending Mail
    const token = await sendForgetPasswordLink(user);

    console.log(token, 'cscbasb,cs');

    res.status(201).json({
      error: false,
      message: 'Link has been sent!',
      token,
    });
  } catch (error) {
    next(error);
  }

}
exports.resetPasswordController = async (req, res, next) => {
  // Extracting the id
  const userId = req.user?.id;
  const { password } = req.body
  try {
    const user = await findUser({ id: userId }, [
      '-password',
      '-refreshToken',
      '-otp',
      '-__v'
    ]);

    // If user does not exist
    if (!user) {
      throw new ErrorHandler('User with this id not found!');
    }
    // Hash user's password
    const hashedPassword = await hashPassword(password);
    // Updateing Refresh Token in the existing user
    const updatedData = await createUserOrUpdate(
      {
        password: hashedPassword,
      },
      user
    );
    res.status(200).json({
      message: 'User updated success',
      data: updatedData,
    })
  } catch (error) {
    next(error)
  }
}

exports.logoutController = async (req, res, next) => {
  try {
    const { userId } = req.user?.id
    const user = await findUser({ id: userId });

    // If user does not exist
    if (!user) {
      throw new ErrorHandler('User with this id not found!');
    }
    // Clearing the cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    })
    // Clearing the cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    })
    res.status(200).json({
      error: false,
      message: 'Logout Success'
    })
  } catch (error) {
    next(error);
  }

}

exports.sendOtpController = async (req, res, next) => {
  const { phone } = req.body;

  try {
    const user = await findUser({ phone })
    // If user does not exist
    if (!user) {
      throw new ErrorHandler('User with this id not found!');
    }
    const verificationOTP = await sendOTPVerification(phone)
    console.log(verificationOTP, 'from 318');
    // Updateing Refresh Token in the existing user
    const updatedData = await createUserOrUpdate(
      {
        phoneOtp: verificationOTP,
      },
      user
    );
    res.status(201).json({
      message: 'Message Sent Success',
      otp: verificationOTP,
      data: updatedData
    })
  } catch (error) {
    next(error);
  }

}

exports.verifyOtpController = async (req, res, next) => {
  const { phone, otp } = req.body;
  try {
    const user = await findUser({ phone })
    // If user does not exist
    if (!user || user.phoneOtp !== otp) {
      throw new ErrorHandler('Invalid OTP');
    }
    // Updateing Refresh Token in the existing user
    const updatedData = await createUserOrUpdate(
      {
        phone_verified: true,
      },
      user
    );
    res.status(201).json({
      message: 'Phone Number verified Success',
      data: updatedData
    })
  } catch (error) {
    next(error)
  }
}