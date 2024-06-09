import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model('User', userSchema);
export default class UserRepository {
    // add a new doctor to the database. 
    // if the doctor is already registered, return an error.
    async registerDoctor(data) {
        try {
            const checkDuplication = await userModel.findOne({ email: data.email });
            if (!checkDuplication) {
                const newRegistration = new userModel({
                    name: data.name,
                    email: data.email,
                    password: data.password
                });
                await newRegistration.save();
                return newRegistration;
            } else {
                console.log("user already exists");
                throw new Error("User already exists.");
            }
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong while registering a new doctor")
        }
    }

    // login a doctor based on credentials. 
    // the function is used to verify if email matches with any email in the database. 
    // if not, return error.
    // else, return that particular user. 
    async login(email) {
        try {
            const user = await userModel.findOne({ email: email });
            if (user)
                return user;
            else {
                throw new Error("User not found");
            }
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong while logging")
        }
    }
}