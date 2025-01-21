const express = require('express');
const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
  resetPassword,
  forgotPassword,
  SearchSchool,
  SearchConsultant,
  updateLocation,
  getUser,          // Added getUser controller
  getUserById,      // Added getUserById controller
} = require('../controllers/user');
const { isAuth } = require('../middleware/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middleware/validation/user');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/sign-up', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post('/reset-password', resetPassword);
router.post('/upload-profile', isAuth, uploads.single('profile'), uploadProfile);
router.post('/forgot-password', forgotPassword);
router.post('/search-school', SearchSchool);
router.post('/search-consultant', SearchConsultant);
router.post('/update-location-user', updateLocation);

// Routes for getUser and getUserById
router.get('/get-users', isAuth, getUser);           // Get all users
router.get('/get-user-by-id/:id', isAuth, getUserById);   // Get user by ID

module.exports = router;
