import User from '../../models/User.js'

export const getAllUsers = async (req, res) => {
    console.log("get all user");
    
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, role } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

   
    if (req.file && req.file.path) {
      user.image = req.file.path;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });

  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).json({ message: "Something went wrong while updating user" });
  }
};


export const deleteUserByAdmin = async (req, res) => {
  const { id } = req.params;
console.log("Attempting to delete user with ID:", id);

  try {
    const deletedUser = await User.findByIdAndDelete(id); // hard delete
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error while deleting user!" });
  }
};
