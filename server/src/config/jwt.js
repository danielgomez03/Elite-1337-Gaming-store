const jwt = require("jsonwebtoken");
const { User, Login } = require("../database");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const generateAuthToken = (userId, userRole, email) => {
  const token = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
      email: email,
    },
    jwtSecret,
    { expiresIn: "2h" },
  );
  return token;
};

const handleUnauthorized = (res) => {
  return res.status(401).json({ error: "Unauthorized" });
};

const handleGuest = async (req, res, next) => {
  // Handle guest role - access to public routes only
  if (req.path.startsWith("/admin") || req.path.startsWith("/superadmin")) {
    return handleUnauthorized(res);
  }
  next();
};

const handleCommonUser = async (req, res, next) => {
  // Handle common user role - access to public and user-specific routes
  if (req.path.startsWith("/admin") || req.path.startsWith("/superadmin")) {
    return handleUnauthorized(res);
  }

  // Check if the user exists in the database based on the user ID
  const user = await User.findByPk(req.user.userId, {
    include: [
      {
        model: Login,
        attributes: ["email"],
      },
    ],
  });

  if (!user || !user.login || user.login.email !== req.user.email) {
    return handleUnauthorized(res);
  }

  // Access common user-specific data from req.user or user, if needed...
  next();
};

const handleAdmin = async (req, res, next) => {
  // Handle admin role - access to public and admin-specific routes
  // Exclude super admin routes
  if (req.path.startsWith("/superadmin")) {
    return handleUnauthorized(res);
  }

  const user = await User.findByPk(req.user.userId, {
    include: [
      {
        model: Login,
        attributes: ["email"],
      },
    ],
  });

  if (!user || !user.login || user.login.email !== req.user.email) {
    return handleUnauthorized(res);
  }

  next();
};

const handleSuperAdmin = async (req, res, next) => {
  // Handle super admin role - access to all routes
  const user = await User.findByPk(req.user.userId, {
    include: [
      {
        model: Login,
        attributes: ["email"],
      },
    ],
  });

  if (!user || !user.login || user.login.email !== req.user.email) {
    return handleUnauthorized(res);
  }

  next();
};

const authenticateJWT = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    // No token provided - treat as a guest
    return handleGuest(req, res, next);
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Check user role
    const { userRole } = decoded;

    if (!userRole) {
      // Guest role - treat as a guest
      return handleGuest(req, res, next);
    } else if (userRole === "common") {
      return handleCommonUser(req, res, next);
    } else if (userRole === "admin") {
      return handleAdmin(req, res, next);
    } else if (userRole === "super") {
      return handleSuperAdmin(req, res, next);
    }
  } catch (error) {
    // Invalid token
    return handleUnauthorized(res);
  }
};

module.exports = {
  generateAuthToken,
  authenticateJWT,
};
