import JWT from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    console.log("protect");
    
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findById(decoded.id).select("-password");
      if (!user)
        return res.status(401).json({ message: "User not available..." });

      req.user = user;      
      next();
    } else {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
