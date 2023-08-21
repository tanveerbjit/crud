const AccountController = require("../controller/AccountController");
const getPostData = require("../util/bodyParser");
const errResponse = require("../util/errorResponse");

module.exports = async (req, res) => {

  if (req.url === "/api/v1/account/") {

    const data = await getPostData(req);
    AccountController.store(req,res,data);

  }else{
    errResponse(res);
  }

};
