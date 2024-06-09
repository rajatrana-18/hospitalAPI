import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next) => {
    // reading the token
    const token = req.headers['authorization'];

    // return error if no token is found
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    // check if the token is valid
    try {
        const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
        req.userID = payload.userID;
        console.log(payload);
    }
    catch (err) {
        return res.status(401).send("Unauthorized");
    }

    // call the next middleware
    next();
}

export default jwtAuth;
