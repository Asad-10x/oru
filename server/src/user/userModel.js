const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        f_name: {
        type: String,
        required: true,
    },
        l_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default:"Member",
        enum: ["Lead", "Admin", "Member"]
    },
}, {
    collection: 'users',
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
