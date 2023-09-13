const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

class PuffCheeks {
  /**
   * Creates a new Json Database or opens an existing one
   * @constructor
   * @param {String} fname - File name to store - will append .json if needed
   * @param {String} key - Unique key to identify object
   * @param {String} [folder = "puff_cheeks_storage"] - Storage folder
   */
  constructor(fname, key, folder = "puff_cheeks_storage") {
    this.fname = fname;

    if (fname === "" || fname === undefined) {
      throw new Error("Missing file name!");
    }

    if (key === "" || key === undefined) {
      throw new Error("Missing key name!");
    }

    if (path.extname(fname) !== ".json") {
      fname = fname + ".json";
    }

    this.filePath = path.join(folder, fname);

    try {
      const loadData = JSON.parse(fs.readFileSync(this.filePath));

      this.key = loadData.key;
      this.data = loadData.data;
    } catch {
      this.key = key;

      // Ensure storage directory Exists
      fs.mkdirSync(folder, { recursive: true });

      this.data = [];
      this.#save();
    }

    if (key !== this.key) {
      throw new Error("Key does not match saved key")
    }
  }

  #save() {
    const pretty = JSON.stringify({ key: this.key, data: this.data }, null, 2);
    fs.writeFileSync(this.filePath, pretty);
  }

  /**
   * Adds a single Object to the front of the array
   * @param {Object} object - add an object, must have matching key parameter
   * @returns {Boolean} True if object added, false if object has duplicate key/id
   */
  add(object) {
    if (!(this.key in object)) {
      throw new Error("Object missing valid id");
    }

    const result = this.data.some((e) => {
      return e[this.key] === object[this.key];
    });

    if (result) {
      return false;
    }

    object.id = crypto.randomUUID();
    this.data.unshift(object);

    this.#save();

    return true;
  }

  /**
   * Deletes an oject from the array
   * @param {Object} object - delete an object, must have matching id parameter
   * @returns {Boolean} True if object deleted, false if object not in db
   */
  delete(object) {
    if (!(this.key in object)) {
      throw new Error("Object missing valid id");
    }

    const index = this.data.findIndex((e) => {
      return e[this.key] === object[this.key];
    });

    if (index == -1) {
      return false;
    }

    this.data.splice(index, 1);

    this.#save();

    return true;
  }

  /**
   * Deletes an object by key
   * @param {String} key - unique string
   * @returns {Boolean} True if object deleted, false if object not in db
   */
  deleteByKey(key) {
    const index = this.data.findIndex((e) => {
      return e[this.key] === key;
    });

    if (index == -1) {
      return false;
    }

    this.data.splice(index, 1);

    this.#save();

    return true;
  }

  /**
   * Deletes an object by ID
   * @param {Number} id - A unique number (UUID)
   * @returns {Boolean} True if object deleted, false if object not in db
   */
  deleteById(id) {
    const index = this.data.findIndex((e) => {
      return e.id === id;
    });

    if (index == -1) {
      return false;
    }

    this.data.splice(index, 1);

    this.#save();

    return true;
  }

  /**
   * Updates objects
   * @param {Object} object - Must have matching key
   * @returns {Boolean} True if object updated, false if object not in db
   */
  update(object) {
    if (!(this.key in object)) {
      throw new Error("Object missing valid id");
    }

    const index = this.data.findIndex((e) => {
      return e[this.key] === object[this.key];
    });

    if (index == -1) {
      return false;
    }

    this.data[index] = object;

    this.#save();

    return true;
  }

  /**
   * Finds object by key
   * @param {String} id - unique string
   * @returns {Object|Boolean} Object if found, false if object not in db
   */
  findByKey(key) {
    const index = this.data.findIndex((e) => {
      return e[this.key] === key;
    });

    if (index == -1) {
      return false;
    }

    return this.data[index];
  }

  /**
   * Finds object by Id
   * @param {String} id - unique string
   * @returns {Object} Object if found, false if object not in db
   */
  findById(id) {
    const index = this.data.findIndex((e) => {
      return e.id === id;
    });

    if (index == -1) {
      return false;
    }

    return this.data[index];
  }

  /**
   * Sorts the Data array using an ordered array of keys
   * @param {Array} id - Array of keys
   * @returns {Boolean} - true if sorted, false if failed
   */
  sortByKey(array) {
    let newData = [];

    if (this.data.length != array.length) {
      return false;
    }

    let result;
    for (let i = 0; i < array.length; i++) {
      result = false;
      for (let j = 0; j < this.data.length; j++) {
        if (array[i] === this.data[j][this.key]) {
          newData.push(this.data[j]);
          result = true;
          break;
        }
      }

      if (!result) {
        break;
      }
    }

    if (result) {
      this.data = newData;

      this.#save();
    }
    return result;
  }
}

module.exports = PuffCheeks;
