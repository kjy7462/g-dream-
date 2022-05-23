const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

//가맹점 생성
exports.creatfranchisee = async function(req, res){

const{ title, category, address }= req.body;
if(typeof title !== "string" ||
   typeof category !== "string" ||
   typeof address !== "string"
){
  return res.send({
    isSuccess: flase,
        code: 400, // 요청 실패시 400번대 코드
        message: "값을 정확히 입력해주세요 ",
  });
}
try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.insertFranchisee(connection, 
      title,
      category,
      address);

      return res.send({
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "가맹점 생성 요청 성공",
      });
    } catch (err) {
      logger.error(`creatFranchsiee Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`creatFranchisee Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};




exports.readfranchisee = async function(req, res){
  const{ category } =req.query;
  
  if (category){
    const validCategory = [
      "편의점",
      "중식",
      "한식",
      "제과점",
      "반찬",
      "양식",
      "분식",
      "패스트푸드", 
    ];

    if(!validCategory.includes(category)){
      return res.send({
        isSuccess: flase,
        code: 400, // 요청 실패시 400번대 코드
        message: "유효한 카테고리가 아닙니다",
      });

    }
  }


  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectFranchisee(connection, category);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "가맹 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`readFranchsiee Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readFranchisee Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }

};

