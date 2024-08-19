const  jwt  = require("jsonwebtoken")

 const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '15d'
    })

    res.cookie("jwt",token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // in milliseconds
        httpOnly: true, // prevents XSS attacks cross-site scripting attacks or u can say this token or cookie cannot we accessible from javascript
        sameSite: "strict",  // prevents CSRF attacks cross-siterequest forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
 }

 module.exports = generateTokenAndSetCookie