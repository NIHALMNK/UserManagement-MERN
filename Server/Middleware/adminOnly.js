export const adminOnly = (req, res, next) => {
    console.log("i want to check user");
    
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
