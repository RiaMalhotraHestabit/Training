import ProductRepo from "../repositories/product.repository.js";

export const getProducts = async (params) => {
  const {
    search,
    minPrice,
    maxPrice,
    tags,
    sort = "createdAt:desc",
    page = 1,
    limit = 10,
    includeDeleted = false
  } = params;

  const query = {};

  // Soft delete handling
  if (!includeDeleted) {
    query.deletedAt = null;
  }

  // Search (regex + OR)
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  // Price filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Tags filter
  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  // Sorting
  const [field, order] = sort.split(":");
  const sortObj = { [field]: order === "desc" ? -1 : 1 };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    ProductRepo.findWithFilters(query, {
      sort: sortObj,
      skip,
      limit: Number(limit)
    }),
    ProductRepo.countWithFilters(query)
  ]);

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit)
    }
  };
};

export const createProduct = async (data) => {
  const product = await ProductRepo.create(data);
  return product;
};


export const deleteProduct = async (id) => {
  const product = await ProductRepo.softDeleteById(id);

  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    err.code = "PRODUCT_NOT_FOUND";
    throw err;
  }

  return product;
};
