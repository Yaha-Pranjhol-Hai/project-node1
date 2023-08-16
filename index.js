const express = require("express");
const app = express(); // it creates an instance
const users = require('./MOCK_DATA.json');
const fs = require("fs");

const PORT = 8000;

//Middleware- can be understood as a plugin for now.
app.use(express.urlencoded({ extended: false}));

//Routes

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html);
})

app.route("/api/users")
.get((req, res) => {
    return res.json({status: "Pending"});
})
.post((req, res) => {
    const body = req.body; // all the data is in the body by default.
    if( !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
        return res.status(400).json({ status: "All fields are req..."});
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({status: "Success", id: users.length});
    })
})

app.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
        if(!user){
            return res.status(404).json({ error: "User Not Found!"});
        }
    return res.json(user);
})
.delete((req,res) => {
    const id = Number(req.params.id);
    const userIdx = users.findIndex((user) => user.id === id);
    const delUser = users.splice(userIdx, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(200).json( {status: "success", delUser });
    })
})

// app.patch("/api/users/:id", (req,res) => {
//     const getId = Number(req.params.id);
//     const body = req.body;
//     const userIdx = users.findIndex((user) => user.id === getId);
//     const updatedUser = {...userIdx, ...body};
//     userIdx = updatedUser;
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
//         return res.json({status: "Success", updatedUser});
//     })
// })
    

app.listen(PORT, console.log(`Your server started at ${PORT}`));