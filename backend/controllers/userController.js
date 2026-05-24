const User = require("../model/User");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    console.log(users, "check mydata")

    res.status(200).json(users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.addUsers = async (req, res) => {
  try{
    const user = await User.create(req.body);
    res.status(201).json(user)
  }catch(err){
    console.error('addUsers error:', err);
    res.status(500).json({
      error: err.message
    })
  }
}

exports.editUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("editUsers error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.error("deleteUsers error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};