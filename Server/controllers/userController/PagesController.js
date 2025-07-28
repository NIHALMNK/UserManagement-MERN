import User from '../../models/User.js';
import bcrypt from 'bcrypt';

export const setProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not defined." });
    }

    const user = req.user;
    console.log("Authenticated user:", user._id);

    return res.status(200).json({ message: "User profile fetched successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;

    if (typeof password === "string" && password.trim()) {
      user.password = await bcrypt.hash(password.trim(), 10);
    }

    if (req.file && req.file.path) {
      user.image = req.file.path;
    }

    await user.save();
    console.log(user);
    
    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(400).json({ message: "Profile update error" });
  }
};
