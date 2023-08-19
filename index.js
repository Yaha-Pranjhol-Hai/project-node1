const express = require("express");
const app = express(); // it creates an instance
const fs = require("fs");
const mongoose = require("mongoose");
const PORT = 8000;

//Connection
mongoose
.connect("mongodb://127.0.0.1:27017/nodeJS-app-1")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error",err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
    },
    {
        timestamps: true
    }
)

const User = new mongoose.model("user", userSchema);

//Middleware- can be understood as a plugin for now.
app.use(express.urlencoded({ extended: false}));

//Routes

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>`;
    res.send(html);
})

app.route("/api/users")
.get( async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})
.post( async (req, res) => {
    const body = req.body; // all the data is in the body by default.
    if( !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
        return res.status(400).json({ status: "All fields are req..."});
    }
    // users.push({...body, id: users.length + 1});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({status: "Success", id: users.length});
    // })
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    });
    console.log("result ", result);
    return res.status(201).json({status: "success"});
})

app.route("/api/users/:id")
.get( async (req, res) => {
    const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ error: "User Not Found!"});
        }
    return res.json(user);
})
.delete( async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json( {status: "success"});
})
    

app.listen(PORT, console.log(`Your server started at ${PORT}`));