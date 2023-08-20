const express = require("express");
const { handleGetAllUsers, handleGetUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user");

const router = express.Router();

//Routes
router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router.route("/:id")
    .get(handleGetUserById)
    .delete(handleDeleteUserById)

module.exports = router;