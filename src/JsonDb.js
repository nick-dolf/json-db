class JsonDb {
  /**
   * @param {String} fname - File name to store - will append .json
   * @param {String} [id = id] - Unique string to identify object
   */
  constructor(fname, id = "id") {
    if (path.extname(fname) !== ".json") {
      fname = fname + ".json";
    }

    this.filePath = path.join(process.cwd(), "nutstore", fname);
    this.id = id;
  }

}

module.exports = { JsonDb };