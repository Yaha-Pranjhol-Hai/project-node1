const express = require("express");
const {connectMongoDB} = require("./connection");

const { logReqRes } = require('./middlewares');

const userRouter = require("./routes/user");

const app = express(); // it creates an instance
const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/nodeJS-app-1").then(() => console.log("MongoDB Connected!"));

//Middleware- can be understood as a plugin for now.
app.use(express.urlencoded({ extended: false}));

app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);
app.listen(PORT, console.log(`Your server started at ${PORT}`));