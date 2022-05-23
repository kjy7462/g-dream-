const { pool } = require("../../config/database");

exports.selectFranchisee = async function (connection, category){
  const selectAllFranchiseeQuery = `SELECT title, category, address, phone, openTime, closeTime, lat, longi FROM enrolment.franchisee where status = 'a';`;
  const selectCategorizedFranchiseeQuery = `SELECT title, category, address, phone, openTime, closeTime, lat, longi FROM enrolment.franchisee where status = 'a' and category = ?;`;

  const Params = [category];
  const Query = category 
  ? selectCategorizedFranchiseeQuery 
  : selectAllFranchiseeQuery;

  const rows = await connection.query(Query, Params);

  return rows;

};
exports.insertFranchisee = async function(connection, 
      title,
      category,
      address){
        const Query = `insert into franchisee(title, category, address) values (?,?,?);`;
        const Params =[title, category, address];
        const rows = await connection.query(Query, Params);
        return rows;
      }


