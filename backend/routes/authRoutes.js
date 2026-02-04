const express = require("express");
const { Signup, Login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);


router.get("/check",async(req,res)=>{
  try{
    const authHeader= req.headers.authorization;
    if(!authHeader){
      return res.status(401).json({
        message:"Unauthorised"
      })
    }

    const token=authHeader.split(" ")[1];
    const decoded= jwt.verify(token,process.env.secret);

    res.status(200).json({
      message: decoded.id
    })
  }catch(err){
    res.status(401).json({ message: "Invalid or expired token" });
  }
})

module.exports = router;