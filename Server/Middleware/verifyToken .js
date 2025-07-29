import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header received:", authHeader); // 👈 Add this

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token); // 👈 Add this

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token verified, decoded user:", decoded); // 👈 Add this

    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message); // 👈 Add this
    return res.status(401).json({ message: "Token is not valid" });
  }
};
