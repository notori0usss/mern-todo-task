const jwt = require("jsonwebtoken")
const secret_key = "SWAROPpasd"
const authenticate = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, secret_key)
            req.userId = user.id
        } else {
            res.status(401).json({message: "Unauthorized User"})
        }
        next()
    } catch (e) {
        res.status(401).json({message: e.message})
    }
}
module.exports = authenticate