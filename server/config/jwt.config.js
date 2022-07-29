const jwt = require("jsonwebtoken")



module.exports.authenticate = (req, res, next) => {
    console.log(req.cookies)
    jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
        console.log(payload)
        if (err) {
            console.log(err)
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}