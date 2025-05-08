const User = require("../../models/User");

const getListUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password field

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

module.exports = {
  getListUsers,
};
