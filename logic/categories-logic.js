let categoriesDal = require("../dal/categories-dal");

async function getAllCategories() {
  let categories = await categoriesDal.getCategoriesFromDB();
  return categories;
}

async function getSubCategory(categoryId) {
  let subCategory = await categoriesDal.getSubCategory(categoryId);
  return subCategory;
}

module.exports = {
  getAllCategories,
  getSubCategory,
};
