
const express = require('express');
const {User,Admin,Course} = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET} = require("../middleware/auth")
const {authenticateJwt} = require("../middleware/auth");

const router = express.Router();

router.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(403).json({ message: "User already exists" });
    } else {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ username, password:hashedPassword});
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: "User created", token });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            res.status(403).json({ message: "Authentication failed" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(403).json({ message: "Authentication failed" });
            return;
        }

        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: "Logged in", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/courses', authenticateJwt, async(req,res)=>{
    try{
    const courses = await Course.find({});
    res.json({courses});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post('/courses/:courseId', authenticateJwt, async(req,res)=>{
    try{
    const course = await Course.findById(req.params.courseId);
    if(course){
        const user = await User.findOne({username: req.user.username});
        if(user){
            if (user.purchasedCourses ) {
                return res.json({ message: "Already purchased" });
            }
    
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message: "Course purchased"});
        }
        else{
            res.status(403).json({message:"User not found"});
        }
    }
    else{
        res.status(404).json({message: "Course not found"});
    }
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
});

router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    try {
        // Find the user by username from the JWT payload and populate the purchasedCourses field
        const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
        
        // Send the user data in the response
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports= router;