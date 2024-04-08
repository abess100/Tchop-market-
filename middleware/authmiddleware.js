const Jwt = require('jsonwebtoken')
const  asyncHandler = require('express-async-handler')
const user = require('../models/userModel')
const protect = asyncHandler (async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await user.findById(decoded.id).select('-password')
            return res.status(200).send(req.user)
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('not authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect