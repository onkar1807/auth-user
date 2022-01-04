const jwt  = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
        req.user = user;
    }else {
        return res.status(400).json({
            error: "Authorization denied"
        })
    }
    next();
}

