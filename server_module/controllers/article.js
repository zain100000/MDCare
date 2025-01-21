const Article = require("../models/article");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
    if (!user.superAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
    const { title, author, category, content } = req.body;

    // Create a new article instance
    const article = new Article({ title, author, category, content });
    await article.save();

    res.status(201).json({
      success: true,
      message: "Article created successfully!",
      article,
    });
  } catch (error) {
    console.error("Error creating article:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find(); // No token verification
    res.status(200).json({ success: true, articles }); // Correct data structure
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// delete article
exports.deleteArticle = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
    if (!user.superAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
    const { id } = req.body; // Extract the Article ID from the request body

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Article ID is required!" });
    }

    // Find and delete the Article by ID
    const deletedArticle = await Article.findByIdAndDelete(id);

    // Check if the article was found and deleted
    if (!deletedArticle) {
      return res
        .status(404)
        .json({ success: false, message: "article not found!" });
    }

    res.status(200).json({
      success: true,
      message: "article deleted successfully!",
      deletedArticle,
    });
  } catch (error) {
    console.error("Error deleting article:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// update/edit article
exports.editArticle = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
    if (!user.superAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
    const { id } = req.body; // Extract the article ID from the query parameters
    const { title, author, category, content } = req.body; // Extract the updated details from the body

    // Check if the ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Article ID is required!" });
    }

    // Find the article by ID and update its fields
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, author, category, content }, // Update these fields
      { new: true } // Return the updated document
    );

    // Check if the article was found
    if (!updatedArticle) {
      return res
        .status(404)
        .json({ success: false, message: "article not found!" });
    }

    // Send success response with the updated article
    res.status(200).json({
      success: true,
      message: "article updated successfully!",
      updatedArticle,
    });
  } catch (error) {
    console.error("Error updating article:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};
