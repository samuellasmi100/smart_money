const connection = require('./connection-wrapper');

async function getIncomes() {
    try {
      let sql = "SELECT * FROM gong.revenue_categorys;";  
      
      let incomes = await connection.executeWithParameters(sql);
   
      return incomes; 
    } catch (error) {
      throw new Error("Database query failed: " + error.message);
    }
  }
  


  
module.exports = {
    getIncomes
};
