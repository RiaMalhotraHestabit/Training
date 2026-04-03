import Product from "../models/Product.js";

class ProductRepository {
  create(data) {
    return Product.create(data);
  }

  findById(id) {
    return Product.findById(id);
  }

  findPaginated({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    return Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return Product.findByIdAndDelete(id);
  }

  findWithFilters(query, options) {
    return Product.find(query)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit);
  }

  countWithFilters(query) {
    return Product.countDocuments(query);
  }

  softDeleteById(id) {
    return Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
  }
}

export default new ProductRepository();
