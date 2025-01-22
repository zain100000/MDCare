const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Video = require("../models/videos");
const { video } = require("../helper/imageUpload");

exports.addVideo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed!" });
  }
  try {
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
    const { title, link, description } = req.body;
    if (!title || !link || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const isVideo = await Video.findOne({ link: link });
    console.log(isVideo);
    if (isVideo) {
      return res
        .status(400)
        .json({ success: false, message: "Video already exist!" });
    }
    const video = new Video({ title, link, description });

    await video.save();
    return res
      .status(201)
      .json({ success: true, message: "Video added successfully!", video });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.editVideo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed!" });
  }
  try {
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
    const { title, link, description } = req.body;
    if (!title && !link && !description) {
      return res
        .status(400)
        .json({ success: false, message: "Atleast one field is required!" });
    }
    const id = req.headers.id;
    const video = await Video.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found!" });
    }
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      {
        title: title ?? video.title,
        link: link ?? video.link,
        description: description ?? video.description,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Video updated successfully!",
      video: updatedVideo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed!" });
  }
  try {
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
    const id = req.headers.id;
    const video = await Video.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found!" });
    }
    await Video.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getAllVideo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
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

  try {
    const videos = await Video.find();
    return res
      .status(200)
      .json({ success: true, message: "Videos fetched successfully!", videos });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getVideo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
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

  try {
    const id = req.headers.id;
    const video = await Video.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Video fetched successfully!", video });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.SearchVideo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

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

  const { title } = req.body;

  try {
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const video = await Video.find(query);
    res
      .status(200)
      .json({ success: true, message: "Video fetched successfully!", video });
  } catch (error) {
    console.error("Error searching schools:", error.message);
    res.status(500).json({
      success: false,
      error: "An error occurred while searching for video",
    });
  }
};
