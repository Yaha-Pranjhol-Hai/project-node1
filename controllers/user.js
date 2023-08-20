const User = require("../models/user");

async function handleGetAllUsers(req,res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ error: "User Not Found!"});
        }
    return res.json(user);
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json( {status: "success"});
}

async function handleCreateNewUser(req, res) {
    const body = req.body; // all the data is in the body by default.
    if( !body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
        return res.status(400).json({ status: "All fields are req..."});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    });
    console.log("result ", result);
    return res.status(201).json({status: "success", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleCreateNewUser,
};