import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "SecretKey3000");

      req.userId = decoded._id;
      next();
    } catch (error) {
      res.status(403).json({
        message: "No access.",
      });
    }

  } else {
    res.status(403).json({
      message: "No access.",
    });
  }
};
