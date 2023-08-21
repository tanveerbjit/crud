const Model = require("./Model")

class Account extends Model {
  constructor() {
    super("accounts");
  }

  // transactions(foreignId, key = "account_id") {
  //   // super("transactions");
  //   Model.prototype.foreignId = key;
  //   return this.hasMany(foreignId);
  // }
  
}

module.exports = new Account();