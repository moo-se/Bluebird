import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { handleError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(handleError(401, "Unauthorized"));

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT);
  //   console.log(decoded); // return object { id: '65707874ecf637989a9c445e', iat: 1702100450 }
  //   //const user = await User.findById(decoded.id);
  //   req.user = decoded;
  //   next();
  // } catch (e) {
  //   next(handleError(403, "Not authorized to access this route"));
  // }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)
      return next(handleError(403, "Not authorized to access this content"));
    req.user = user; // return object { id: '65707874ecf637989a9c445e', iat: 1702100450 }
    next();
  });
};
