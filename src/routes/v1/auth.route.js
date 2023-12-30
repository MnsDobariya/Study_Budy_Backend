const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router.post('/register', validate(authController.register.validation), catchAsync(authController.register.handler));
router.post('/login', validate(authController.login.validation), catchAsync(authController.login.handler));


// router.post('/login', validate(authValidation.login), authController.login);
// router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

router.post('/send-otp',validate(authController.sendOtp.validation),catchAsync( authController.sendOtp.handler));
router.post('/verify-otp', validate(authController.verifyOTP.validation),catchAsync( authController.verifyOTP.handler));
router.post('/forgot-password',validate(authController.forgotPassword.validation),catchAsync(authController.forgotPassword.handler))

module.exports = router;
