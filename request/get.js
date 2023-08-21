const AccountController = require("../controller/AccountController");
const errResponse = require("../util/errorResponse");



module.exports = (req, res) => {
  
  if(req.url === '/api/v1/account/'){
    AccountController.index(req, res);
  }
  else if ( req.url.match(/\/api\/v1\/account\/\d+/) ){
    const id = req.url.split("/")[4];
    AccountController.show(req, res, id);
  }
  else{
    errResponse(res);
  }

};
