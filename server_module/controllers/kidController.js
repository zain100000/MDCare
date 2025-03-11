const Kid = require("../models/kid");

// Create a new kid
exports.createKid = async (req, res) => {
  try {
    const { name, age, gender, speciality } = req.body;

    // Validation check
    if (!name || !age || !gender || !speciality) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newKid = new Kid({ name, age, gender, speciality });
    await newKid.save();

    res.status(201).json({ success: true, message: "Kid added successfully.", kid: newKid });
  } catch (error) {
    console.error("Error creating kid:", error.message);
    res.status(500).json({ success: false, message: "Server error while creating kid." });
  }
};

// Get all kids
exports.getAllKids = async (req, res) => {
  try {
    const kids = await Kid.find();
    res.status(200).json({ success: true, kids });
  } catch (error) {
    console.error("Error fetching kids:", error.message);
    res.status(500).json({ success: false, message: "Server error while fetching kids." });
  }
};

// Get a single kid by ID
exports.getKidById = async (req, res) => {
  try {
    const { id } = req.params;
    const kid = await Kid.findById(id);

    if (!kid) {
      return res.status(404).json({ success: false, message: "Kid not found." });
    }

    res.status(200).json({ success: true, kid });
  } catch (error) {
    console.error("Error fetching kid:", error.message);
    res.status(500).json({ success: false, message: "Server error while fetching kid." });
  }
};

// Update a kid's details
exports.updateKid = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender, speciality } = req.body;

    const updatedKid = await Kid.findByIdAndUpdate(
      id,
      { name, age, gender, speciality },
      { new: true, runValidators: true }
    );

    if (!updatedKid) {
      return res.status(404).json({ success: false, message: "Kid not found." });
    }

    res.status(200).json({ success: true, message: "Kid updated successfully.", kid: updatedKid });
  } catch (error) {
    console.error("Error updating kid:", error.message);
    res.status(500).json({ success: false, message: "Server error while updating kid." });
  }
};

// Delete a kid
exports.deleteKid = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedKid = await Kid.findByIdAndDelete(id);

    if (!deletedKid) {
      return res.status(404).json({ success: false, message: "Kid not found." });
    }

    res.status(200).json({ success: true, message: "Kid deleted successfully." });
  } catch (error) {
    console.error("Error deleting kid:", error.message);
    res.status(500).json({ success: false, message: "Server error while deleting kid." });
  }
};
