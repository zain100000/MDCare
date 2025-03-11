const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const kidController = require("../controllers/kidController");

// Routes for Kid CRUD
router.post("/create",  kidController.createKid);
router.get("/all",  kidController.getAllKids);
router.get("/:id",  kidController.getKidById);
router.put("/:id",  kidController.updateKid);
router.delete("/:id",  kidController.deleteKid);

module.exports = router;
