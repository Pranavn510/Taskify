/*This code defines two middleware functions, protectRoute and isAdminRoute, which are used to protect certain routes and ensure that only authenticated 
users (and optionally only admins) can access them. */

import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token; //This line retrieves the token from the cookies attached to the request. If the token is not present, it will be undefined.

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //If the token exists, it verifies the token using the jwt.verify method and the secret key (process.env.JWT_SECRET).

      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );
      //This line fetches the user information from the database using the user ID from the decoded token.

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };
      //The user information is attached to the req object, making it available to subsequent middleware and route handlers.

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
      //If no token is present or any error occurs during the process, it responds with a 401 Unauthorized status and an appropriate message.
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export { isAdminRoute, protectRoute };
