const User = require("../models/User");

class UserService {
    async getAllUsers() {
        return User.find({}).lean();
    }

    async createUser(data) {
        const user = new User(data);
        return user.save();
    }

    async getUserById(id) {
        return User.findById(id).lean();
    }

    async getUserByExternalId(externalId) {
        return User.findOne({externalId}).lean();
    }

    async deleteUser(id) {
        return User.findByIdAndDelete(id);
    }
}

module.exports = new UserService();
