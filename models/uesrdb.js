const mongoose = require('mongoose');
const path = require('path');


const userSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    number: Number,
    role: String,
    degree: String,
    clg: String,
    passout: Number,
    skills: String,
    exp: String,
    pdfFile: String

},{
    timestamps: true
});





const User = mongoose.model('User',userSchema);

module.exports = User;