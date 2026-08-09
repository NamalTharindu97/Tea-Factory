const asyncHandler = require("express-async-handler");

// Restricts the current user (set by validateToken) to a given set of roles.
// @access must be called after validateToken.
const requireRole = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You do not have permission to perform this action");
    }
    next();
  });

module.exports = requireRole;
