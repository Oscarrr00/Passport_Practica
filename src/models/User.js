const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    // fetch the users
    const userslist = await this.fetchData();

    // found the users
    const userFound = userslist.find(user => user.id === id);

    //   if found return the user

    if (userFound){
      return userFound;
    } else{
      throw new Error(`User with id ${id} not found`);
    }
    //   if not found return Promise.reject(new Error(`User with id ${id} not found`));
  }

  async create(user) {
    // fetch the users
    const users = await this.fetchData();
    // append the user to all the users
    users.push(user);
    // save the users
    await this.saveData(users);
    console.log("se hizo")
    // return the saved user
    return user;
  }
};

module.exports = new User();