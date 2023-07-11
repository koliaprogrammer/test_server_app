const User = require('./../models/Users');

async function getSubordinates(user) {
    let subordinates = [];
    if (user.role === 'Administrator') {
      subordinates = await User.find({});
    } else if (user.role === 'Boss') {
      subordinates = await User.find({ boss: user._id });
      for (let subordinate of subordinates) {
        subordinates.push(...await getSubordinates(subordinate));
      }
    }
    return subordinates;
  }
module.exports = { getSubordinates };