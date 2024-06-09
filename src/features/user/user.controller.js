import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // function to register a doctor. 
    async register(req, res, next) {
        try {
            const data = req.body;
            const hashedPassword = await bcrypt.hash(data.password, 12);    // hashing the password.
            data.password = hashedPassword;
            // register a new doctor.
            const newRegistration = await this.userRepository.registerDoctor(data);
            if (newRegistration) {
                res.status(200).send(newRegistration);
            } else {
                res.status(400).send("Something went wrong or the user is already registered")
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong while registering a new doctor");
        }
    }

    // function to login a doctor.
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.login(email);
            if (user) {
                // validate the credentials of the doctor.
                // if the doctor is registered, create a token, else , the credentials do not match with the database.
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    const token = jwt.sign({ userID: user._id, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    req.userID = user._id;
                    return res.status(200).send(token);
                } else {
                    return res.status(400).send("Invalid credentials");
                }
            } else {
                return res.status(400).send("Invalid credentials");
            }
        } catch (err) {
            next(err);
            console.log(err);
            res.status(400).send("Wrong credentials");
        }
    }
}