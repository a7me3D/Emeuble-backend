const jwt = require("jsonwebtoken");

exports.isAdmin = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    message: 'Token is not valid'
                });
            } else {
                if (decoded.isAdmin) next();
                else return res.status(401).json({message:"unAuthorized"})
            }
        });
    } else {
        return res.json({
            message: 'Auth token is not supplied'
        });
    }
}