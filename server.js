import "./env.js";
import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './src/features/user/user.routes.js';
import { connectUsingMongoose } from './src/config/mongoose.config.js';
import reportRouter from "./src/features/report/report.routes.js";


const server = express();

// this is to inform the server that the data will be in json format. 
server.use(bodyParser.json());

// request handlers. 
server.use("/api/doctors", userRouter);
server.use("/api/patients", reportRouter);
server.use("/api/reports", reportRouter);

// connect to a localhost at port 3000.
server.listen(3000, () => {
    console.log("server is listening at port 3000");
    connectUsingMongoose();     // connect to the mongoose server as soon as the server is connected. 
})