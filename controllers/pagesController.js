
const { error } = require("jquery");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.singup_get = async (req, res) => {
    return res.status(400).send("Passwords do not match");

};
exports.login_get = async (req, res) => {
    return res.status(400).send("Passwords do not match");

};

