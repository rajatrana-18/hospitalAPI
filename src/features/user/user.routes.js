import express from 'express';
import UserController from './user.controller.js';


const userRouter = express.Router();
const userController = new UserController();

// post request to register a new doctor.
userRouter.post("/register", (req, res, next) => {
    userController.register(req, res, next)
});

// post request to login a doctor.
userRouter.post("/login", (req, res, next) => {
    userController.login(req, res, next)
});

export default userRouter;