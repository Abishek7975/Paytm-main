const jwt = require("jsonwebtoken");
const jwtPassword = "Purvanchal";

function middleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(403).json("Access denied");
    console.log(authHeader)

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwtPassword);
        console.log(decoded)

        req.userId = decoded.user_id;

        next();
    } catch (err) {
        return res.status(403).json({"msg" : "Error"});
    }
};

module.exports = middleware;
