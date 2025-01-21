const express = require("express");
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  deleteArticle,
  editArticle,
} = require("../controllers/article");
const { isAuth } = require("../middleware/auth");

router.post("/create-article", isAuth, createArticle); // Create an article
router.get("/get-article", getAllArticles); // Fetch all articles
router.delete("/delete-article", isAuth, deleteArticle); // Delete an article
router.put("/edit-article", isAuth, editArticle); // Update an article

module.exports = router;
