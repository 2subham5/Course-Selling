const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const adminRouter = require("./routes/admin"); 
const userRouter = require("./routes/user");
const {User,Admin,Course} = require('./db/db');
const { authenticateJwt,SECRET} = require('./middleware/auth')
  
const app = express();

app.use(cors())
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// const secretKey = "2_subham5";


// const generateJwtAdmin = (user) => {
//     const payload = { username: user.username };
//     return jwt.sign(payload, secretKey, { expiresIn: '1h' })

// }
// const generateJwtUser = (user) => {
//     const payload = { username: user.username };
//     return jwt.sign(payload, secretKey, { expiresIn: '1h' })

// }

// mongoose.connect
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://subhamrelax45:Askmelater4*@cluster0.8plupdb.mongodb.net/CourseDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});


app.listen(3000, (req, res) => {
    console.log("App listen at port 3000")
});


