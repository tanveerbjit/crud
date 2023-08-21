const Model = require("./Model")

class Transaction extends Model{

    constructor(){
        super('transactions');
    }

    // account(id){
    //     super('accounts');
    //     this.belongsTo(id)
    // }

}

module.exports = new Transaction();