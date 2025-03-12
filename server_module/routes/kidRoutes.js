const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const kidController = require("../controllers/kidController");

// Routes for Kid CRUD
router.post("/add-kid", isAuth, kidController.createKid);
router.get("/get-all-kids", isAuth, kidController.getAllKids);
router.get("/get-kid-by-id/:id", isAuth, kidController.getKidById);
router.put("/update-kid/:id", isAuth, kidController.updateKid);
router.delete("/delete-kid/:id", isAuth, kidController.deleteKid);

module.exports = router;
