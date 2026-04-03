import User from '../models/User.js';

class UserRepository {
  static async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  static async findById(id) {
    return User.findById(id);
  }

  static async findPaginated({ page = 1, limit = 10 }) {
    return User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  static async update(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async delete(id) {
    return User.findByIdAndDelete(id);
  }
}

export default UserRepository;
