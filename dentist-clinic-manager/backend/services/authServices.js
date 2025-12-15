const User = require("../models/userModels");

async function findAllUsers() {
  return await User.find();
}

async function findUser({ id, email, username }, selectField = false) {
  // Use $or operator to allow finding by id, email or username
  const userQuery = User.findOne({
    $or: [
      id ? { _id: id } : null,
      email ? { email } : null,
      username ? { username } : null,
    ].filter(Boolean),
  });
  if (selectField) {
    userQuery.select(`${selectField.join(' ')}`)
  }
  return await userQuery;
}

async function createUserOrUpdate(userData, updatedUser) {
  // In the case of update dynamic keys
  if (Boolean(updatedUser)) {
    for (let key in userData) {
      updatedUser[key] = userData[key];
    }
    return updatedUser.save();
  }
  const data = new User(userData);
  return await data.save();
}

module.exports = {
  findUser,
  createUserOrUpdate,
  findAllUsers,
}