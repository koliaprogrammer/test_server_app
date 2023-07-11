const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['Administrator', 'Boss', 'Regular'] },
    bossId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subordinates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);