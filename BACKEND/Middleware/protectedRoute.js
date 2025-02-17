const User = require('../Models/user')
const jwt = require('jsonwebtoken');


const protectedRoute = async(req, res, next) => {
    try {
        const Token = req.cookies.token

        if (!Token) {
            return res.status(401).json({ message: "Unauthorized - No Token provided" });
        }

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid TOken" });
        }
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error In protectedRoute Middleware :", error.message);
        res.status(500).json({ message: "internal server error" });
    }
}

module.exports = protectedRoute;