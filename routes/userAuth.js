const jwt = require("jsonwebtoken");
//middleware in express is a function that processes incoming requests
const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({message: "Authentication token required!"});    
    }
    jwt.verify(token, "bookStore23",(err, user)=>{
        if(err){
            return res.status(403).json(err);

        }
        req.user = user;
        next(); //passes control to next middleware
    });
};
module.exports = {authenticateToken};