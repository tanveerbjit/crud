const Account = require("../model/Account");
const response = require("../util/response");

class AccountController {
  async index(req, res) {
    const data = await Account.findAll();
    response(res, data);
  }

  async show(req, res, id) {
    const data = await Account.find({ _id: id });
    response(res, data);
  }

  async store(req, res, doc) {
    const data = await Account.insertOne(doc);
    response(res, data);
  }

  async update(req, res, doc, id) {
    const data = await Account.updateOne({ _id: id }, doc);
    response(res, data);
  }

  async destroy(req, res, doc) {
    const data = await Account.deleteOne({ _id: doc.id });
    response(res, data);
  }
}


module.exports = new AccountController();