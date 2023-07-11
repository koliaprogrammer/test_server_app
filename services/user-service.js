const User = require("./../models/Users");
const { getSubordinates } = require("./subordinates-service");
const { generateJWT } = require("./generateToken-service");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
class UserService {
  async registration(name, email, password, role, bossId) {
    const boss = await User.findOne({ bossId });
    if (role !== "Administrator" && !boss) {
      return { status: 400, message: "Invalid bossId" };
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return { status: 400, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      boss,
    });
    await user.save();

    return { status: 200, user };
  }
  async authentication(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { status: 401, message: "Invalid email or password" };
    }
    const token = generateJWT(user);
    return { status: 200, token };
  }

  async getUser(token) {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(payload.id);
    if (!user) {
      return { status: 401, message: "Invalid token" };
    }
    let users;
    if (user.role === "Administrator") {
      users = await User.find({});
    } else if (user.role === "Boss") {
      users = [user];
      users.push(...(await getSubordinates(user)));
    } else {
      users = [user];
    }
    return { status: 200, users };
  }


  async changeBoss(token, userId,bossId) {
    const payload = jwt.verify(token, 'secret');
    const user = await User.findById(payload.id);
    if (!user || user.role !== 'Boss') {
      return {status:401, message: 'Invalid token' };
    }
    const targetUser = await User.findById(userId);
    if (!targetUser || targetUser.bossId.toString() !== user._id.toString()) {
      return {status:400, message:"Invalid target user"}
    }
    targetUser.bossId = bossId;
    await targetUser.save();
    return {status:200}
  }
}
module.exports = new UserService();
