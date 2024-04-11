const jwt = require('jsonwebtoken');

const token = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err)
                    return res.render("connexion");
                req.user = user;
                next();
            });
        } else {
            res.render("inscription")
            return res.status(401).json("You are not authenticated");
        }

    },
    

}


module.exports = token;
