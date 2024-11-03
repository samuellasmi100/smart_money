const connection = require('./connection-wrapper');

async function getCategoriesFromDB() {
    try {
      let sql = "SELECT * FROM gong.expense_category;";  
      
      let categories = await connection.executeWithParameters(sql);
   
      return categories; 
    } catch (error) {
      throw new Error("Database query failed: " + error.message);
    }
  }
  async function getSubCategory(categoryId) {
    try {
        let sql = `
            SELECT  sub.id ,sub.name FROM sub_expense_category sub
            JOIN expense_category 
            ON expense_category.id = sub.category_id 
            WHERE sub.category_id = ?;
        `;
        let parameters = [categoryId];
        let subCategory = await connection.executeWithParameters(sql, parameters);
      
        return subCategory;
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
}

  
module.exports = {
    getCategoriesFromDB,
    getSubCategory
};
