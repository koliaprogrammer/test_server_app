const jwt = require('jsonwebtoken');
require('dotenv').config();
function generateJWT(user) {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY);
}
  
module.exports = { generateJWT };