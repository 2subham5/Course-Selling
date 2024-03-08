const express = require('express');
const { User, Admin, Course } = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth"); // Importing authenticateJwt middleware

const router = express.Router();


router.get('/me',authenticateJwt, async (req, res) => {
    try {
        console.log(req);
        if (!req.user ) {
            // Handle case where req.user is undefined or does not have username
            res.status(403).json({ message: "User not authenticated" });
            return;
        }

        // Initialize admins asynchronously
        const admins = await Admin.findOne({ username: req.user.username });

        if (!admins) {
            // Handle unauthorized access
            res.status(403).json({ message: "Admin doesn't exist" });
            return;
        }

        res.json({ username: admins.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
        res.status(403).json({ message: "Admin already exists" });
    } else {
        const hashedPassword = await bcrypt.hash(password,10);
        const newAdmin = new Admin({ username, password:hashedPassword });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: "Admin created", token });
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch) {
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: "Logged in", token });
        } else {
            res.status(403).json({ message: "Authentication failed" });
        }
    } else {
        res.status(403).json({ message: "Authentication failed" });
    }
});
//needs to be resolved
router.post('/courses', authenticateJwt, async(req, res) => {
try{
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
}
catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
    
});


router.get('/courses', authenticateJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/course/:courseId", authenticateJwt, async(req,res)=>{
    try{
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({course})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
router.put('/course/:courseId', authenticateJwt, async(req, res) => {
    try{
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.status(200).json({ message: "Updated", course });
    } else {
        res.status(404).json({ message: "Course doesn't exist" });
    }
}
catch(error){
    console.log(error);
    res.status(500).json({message:"failed"})
}
});
module.exports = router;


