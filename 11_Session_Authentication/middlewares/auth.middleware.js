import jwt from "jsonwebtoken";

// GET CURRENT USER (current user is logged in or not)
export const authenticationMiddleware = async function name(req, res, next) {
  try {
    // Header authorization: Bearer <TOKEN>
    const tokenHeader = req.headers.authorization;

    //const tokenHeader = req.headers("authorization");

    if (!tokenHeader) {
      // user is not logged in
      return next(); // aage ka kaam kro(login yr signup)
    }

    if (!tokenHeader.startsWith("Bearer")) {
      return res
        .status(400)
        .json({ error: "Authorization header must start with Bearer" });
    }

    const token = tokenHeader.split(" ")[1];

    // actual user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
};

export const ensureAuthenticated = async function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "You must be authenticated" });
  }

  next();
};

export const restrictToRole = function (role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(401).json({
        error: "You are not authorized to access this resource"
      });
    }
    return next();
  };
};
