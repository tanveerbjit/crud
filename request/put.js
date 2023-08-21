const AccountController = require("../controller/AccountController");
const getPostData = require("../util/bodyParser");
const errResponse = require("../util/errorResponse");

module.exports = async (req, res) => {
  if ( req.url.match(/\/api\/v1\/account\/\d+/) ){

    const data = await getPostData(req);
    const id = req.url.split("/")[4];
    AccountController.update(req, res, data, id);

  }else{
    errResponse(res);
  }
};
