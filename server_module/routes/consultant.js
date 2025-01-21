const express = require("express");
const router = express.Router();

// Import controller functions
const {
  consultantLogin,
  createConsultant,
  getWaitingListConsultant,
  editConsultantStatus,
  deleteConsultant
} = require("../controllers/consultant");

// Define the routes
router.post("/create-consultant", createConsultant);
router.get("/get-waitinglist-consultant", getWaitingListConsultant);  // Check if this function is correctly defined in your controller
router.post("/edit-consultant-waiting-status", editConsultantStatus);
router.post("/consultant-login", consultantLogin);
router.post("/delete-consultant", deleteConsultant);

module.exports = router;
