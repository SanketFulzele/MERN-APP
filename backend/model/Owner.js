const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    email: String,
    password: String
},{
    timestamps: true
})

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;
