const express = require("express");
const router = express.Router();

const {
  createSchool,
  getAllSchools,
  deleteSchool,
  editSchool,
  schoolLogin,
  getWaitingList,
  editSchoolStatus,
} = require("../controllers/school");

const { isAuth } = require("../middleware/auth");

// Apply isAuth middleware to routes where authentication is required
router.post("/create-school", isAuth, createSchool);
router.post("/school-waiting-status", isAuth, editSchoolStatus);
router.get("/waitinglist", getWaitingList);
router.get("/get-school", getAllSchools); // No auth needed for getting schools
router.delete("/delete-school", isAuth, deleteSchool);
router.put("/edit-school", isAuth, editSchool);
router.post("/school-login", schoolLogin); // No auth needed for school login

module.exports = router;
