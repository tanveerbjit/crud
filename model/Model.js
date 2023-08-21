const fs = require('fs');

class Model {
  constructor(arg) {
    this._file = arg;
  }

  async findAll() {
   return await this._readCollection();
  }

  async find(arg) {
    const keys = Object.keys(arg);
    let col = await this._readCollection();
    return col.filter((element) => element[keys[0].toString()] == arg[keys[0]]);
  }

  async insertOne(doc) {
    let col = await this._readCollection();
    col.push({ ...doc, _id: col[col.length - 1]._id + 1 });
    await this._writeCollection(col);
    return { acknowledgement: true, inserted: 1 };
  }

  async insertMany(docs) {
    let col = await this._readCollection();
    docs.map((doc) => {
      col.push({ ...doc, id: col[col.length - 1].id + 1 });
    });
    await this._writeCollection(col);
    return { acknowledgement: true, inserted: docs.length };
  }

  async updateOne(arg, doc) {

    const find = await this.find(arg)

    if(find.length > 0){
      const keys = Object.keys(arg);
      let col = await this._readCollection();
      let flag = 0;

      let updatedCol = col.map((element) => {
        if (element[keys[0]] == arg[keys[0]] && !flag) {
          flag = 1;
          return { ...element, ...doc };
        } else {
          return element;
        }
      });

      await this._writeCollection(updatedCol);
      return { acknowledgement: true, updated: 1 };
    }
    return { acknowledgement: false, updated: 0 };
  }

  async updateMany(arg, doc) {
    const keys = Object.keys(arg);
    let col = this._readCollection();
    let updatedCol = col.map((element) =>
      element[keys[0]] === arg[keys[0]] ? { ...element, ...doc } : element
    );
    await this._writeCollection(updatedCol);
  }

  async deleteOne(arg) {
    const find = await this.find(arg);

    if(find.length > 0){
      const keys = Object.keys(arg);
      let col = await this._readCollection();
      let updatedCol = col.filter(
        (element) => element[keys[0].toString()] != arg[keys[0]]
      );
      await this._writeCollection(updatedCol);
      return { acknowledgement: true, deleted: 1 };
    }
    return { acknowledgement: false, deleted: 0 };
    
  }

  async deleteMany(arg) {
    const keys = Object.keys(arg);
    console.log(keys);
    let col = this._readCollection();
    let updatedCol = col.filter((element) => element[keys[0]] !== arg[keys[0]]);
    await this._writeCollection(updatedCol);
  }

  async hasMany(arg) {
    const keys = Object.keys(arg);
    let col = await this._readCollection();
    return col.filter((element) => element[Model.prototype.foreignId] === arg);
  }


  async _readCollection() {
    return await JSON.parse(
      fs.readFileSync(`./data/${this._file}.json`, "utf8")
    );
  }

  async _writeCollection(col) {
    await fs.writeFileSync(`./data/${this._file}.json`, JSON.stringify(col));
  }
}


module.exports = Model;