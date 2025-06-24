const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

//Sign Up
router.post("/sign-up", async (req, res) => {
    try {
      const { username, email, password, address } = req.body;
  
      // Check username length
      if (!username || username.length < 4) {
        return res
          .status(400)
          .json({ message: "Username must be at least 4 characters long." });
      }
  
      // Check if username already exists
      const existingUsername = await user.findOne({ username });
      if (existingUsername) {
        return res
          .status(400)
          .json({ message: "This username is already taken. Please try another." });
      }
  
      // Check if email already exists
      const existingEmail = await user.findOne({ email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "This email is already registered. Please log in or use another email." });
      }
  
      // Validate email format (basic regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ message: "Please enter a valid email address." });
      }
  
      // Check password length
      if (!password || password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long." });
      }
  
      // Check if address is provided
      if (!address || address.trim().length === 0) {
        return res
          .status(400)
          .json({ message: "Address cannot be empty. Please provide a valid address." });
      }
  
      // Hash password and save user
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new user({
        username,
        email,
        password: hashPass,
        address,
      });
      await newUser.save();
  
      return res.status(200).json({ message: "Sign-up successful! You can now log in." });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
//Sign In
router.post("/sign-in", async(req, res)=>{
    try{
       const {username, password} = req.body;

       const existingUser = await user.findOne({username});
       if(!existingUser){
        res.status(400).json({message:"Invalid Credentials!"});

       }
       await bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const authClaims = [{name: existingUser.username},{role: existingUser.role}];
            const token = jwt.sign({authClaims},"bookStore23",{expiresIn: "30d"});
            res.status(200).json({id: existingUser._id,role: existingUser.role, token: token });
        }
        else{
            res.status(400).json({message:"Invalid Credentials!"});
        }
       });
    }  
    catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
});

//get User Info
router.get("/get-user-information",authenticateToken, async (req,res)=>{
    try{
        const {id}= req.headers;
        const data = await user.findById(id).select("-password"); // exclude the password
        return res.status(200).json(data);

    }
    catch(error){
        res.status(500).json({message: "Internal Server Error!"});
       }
});

//update address
router.put("/update-address",authenticateToken, async(req, res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await user.findByIdAndUpdate(id,{address: address});
        return res.status(200).json({message:"Address Updated Successfully!"});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error!"});
    }
})
module.exports = router;