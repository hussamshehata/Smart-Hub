import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (!token) {
        res.status(401);
        return next(new Error("Not authorized, no token"));
    }

    try {
        // Decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request (without password)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(404);
            return next(new Error("User not found"));
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        next(new Error("Not authorized, token failed"));
    }
};
