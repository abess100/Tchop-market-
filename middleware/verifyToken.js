const jwt = require('jsonwebtoken');

const token = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err)
                    return res.status(403).json("le tokken n'est pas valide!");
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated");
        }

    },
    
    verifyJWTandAuthorization : (req, res, next) => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    }

}


module.exports = token;
