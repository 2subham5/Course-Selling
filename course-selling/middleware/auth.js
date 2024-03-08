const jwt = require('jsonwebtoken');
const SECRET = '2_subham5';

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Use space (' ') to split the header
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // console.log("Decoded user:", user);
                req.user = user;
                next();
            }
        });
    } else {
        res.sendStatus(401);
        console.log("Token doesn't exist");
    }
};

module.exports={
    authenticateJwt,
    SECRET
}