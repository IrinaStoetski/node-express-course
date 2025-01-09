const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort("-name price")
    .select("name price")
    .limit(10);

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, page, limit, numericFilters } =
    req.query;
  const queryObject = {
    ...(featured !== undefined && { featured }),
    ...(company !== undefined && { company }),
    ...(name !== undefined && { name: { $regex: name, $options: "i" } }),
  };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b()<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");

    result = result.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");

    result = result.select(fieldsList);
  }

  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;
  const skip = (pageValue - 1) * limitValue;

  result = result.skip(skip).limit(limitValue);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
