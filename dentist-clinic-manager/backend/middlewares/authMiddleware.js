const ErrorHandler = require('../utils/errorHandler');
const { generateDecodedToken } = require('../utils/authHandler')

exports.authenticatedRoutes = async (req, res, next) => {
  try {
    let token;
    // Determine which API is being served
    let secretKey;
    if (req.path.startsWith('/reset-password')) {
      secretKey = process.env.RESET_SECRET;
      token =
        req.header('Authorization')?.replace('Bearer ', '');
    }
    else {
      secretKey = process.env.LOGIN_SECRET;
      // Extracting token
      token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');
    }



    // If the token is not there
    if (!token) {
      throw new ErrorHandler('Token not found!', 401);
    }



    // Verify the incoming refresh token required token and secret key
    const { err, decoded } = await generateDecodedToken(token, secretKey)

    if (err) {
      throw new ErrorHandler('Token Invalid or Expired', 401);
    }
    console.log(token, decoded, err, 'from middleware');
    req.user = decoded.data;
    next();
  } catch (error) {
    next(error);
  }
}

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: "Forbidden: You don't have access",
      });
    }
    next();
  }
}