const PuffCheeks = require("./puff-cheeks");
const path = require("path");
const fs = require("fs");

fs.rmSync(path.join(process.cwd(), "puff_cheeks_storage/"), { recursive: true, force: true });

fs.mkdirSync(path.join(process.cwd(), "json_db_storage"), { recursive: true });

fs.writeFileSync(
  path.join(process.cwd(), "json_db_storage", "sampleTwo.json"),
  JSON.stringify({
    "key": "slug",
    "data": [
      {
        "slug": "tree",
        "name": "flurgl",
        "id": "f79614dc-5c89-40da-9e93-3da7189bc24a"
      },
      {
        "slug": "post",
        "name": "fred",
        "id": "36632646-eab2-4987-9056-5997dbcda9a7"
      }
    ]
  })
);

describe("PuffCheeks('sample')", () => {
  const db = new PuffCheeks("sample", "type");
  const valid1 = { type: "tree", name: "john" };
  const valid2 = { type: "post", name: "fred" };
  const valid3 = { type: "door", name: "jason" };
  const invalid = { door: 40, name: "john" };
  const duplicate = { type: "tree", name: "flurgl" };

  test("filePath", () => {
    expect(db.filePath).toBe("puff_cheeks_storage/sample.json");
  });

  test("key", () => {
    expect(db.key).toBe("type");
  });

  test("add valid object", () => {
    expect(db.add(valid1)).toBe(true);
  });

  test("add second valid object", () => {
    expect(db.add(valid2)).toBe(true);
  });

  test("add third valid object", () => {
    expect(db.add(valid3)).toBe(true);
  });

  test("check contents", () => {
    expect(db.data).toEqual([valid3, valid2, valid1]);
  });

  test("sort by valid key and check contents", () => {
    expect(db.sortByKey(["tree", "post", "door"])).toBe(true)
    expect(db.data).toEqual([valid1, valid2, valid3]);
  });

  test("sort with missing keys and check contents", () => {
    expect(db.sortByKey(["door"])).toBe(false)
    expect(db.data).toEqual([valid1, valid2, valid3]);
  });

  test("sort with invalid keys and check contents", () => {
    expect(db.sortByKey(["door", "race", "tree"])).toBe(false)
    expect(db.data).toEqual([valid1, valid2, valid3]);
  });

  test("add invalid object", () => {
    expect(() => db.add(invalid)).toThrow("Object missing valid id");
  });

  test("add duplicate id object", () => {
    expect(db.add(duplicate)).toBe(false);
  });

  test("find by key, in db", () => {
    expect(db.findByKey("tree")).toBe(valid1);
  });

  test("find by key, not in db", () => {
    expect(db.findByKey("drain")).toBe(false);
  });

  test("find by id, in db", () => {
    const id = db.findByKey("tree").id;
    expect(db.findById(id)).toBe(valid1);
  });

  test("find by id, not in db", () => {
    expect(db.findById("1234")).toBe(false);
  });


  test("delete by id, in db", () => {
    const id = db.findByKey("door").id;
    expect(db.deleteById(id)).toBe(true);
  });

  test("delete by id, not in db", () => {
    expect(db.deleteById("1234")).toBe(false);
  });

  test("check contents", () => {
    expect(db.data).toEqual([valid1, valid2]);
  });

  test("load and check data", () => {
    const dbLoad = new PuffCheeks("sample", "type");
    expect(dbLoad.data).toEqual([valid1, valid2]);
  });
});


describe("PuffCheeks('sampleTwo'), slug, json_db_storage", () => {
  const dbTwo = new PuffCheeks("sampleTwo.json", "slug", "json_db_storage");
  const validTwo = { slug: "plants", name: "Grappt" };
  const validTwo2 = { slug: "rose", name: "Loppe" };
  const invalidTwo = { id: "pla", name: "Twille" };
  const duplicateTwo = { slug: "tree", name: "qurit" };
  const updateTwo = { slug: "plants", name: "qurit" };

  test("filePath", () => {
    expect(dbTwo.filePath).toBe("json_db_storage/sampleTwo.json");
  });

  test("key", () => {
    expect(dbTwo.key).toBe("slug");
  });

  test("add valid object", () => {
    expect(dbTwo.add(validTwo)).toBe(true);
  });

  test("add invalid object", () => {
    expect(() => dbTwo.add(invalidTwo)).toThrow("Object missing valid id");
  });

  test("add duplicate object", () => {
    expect(dbTwo.add(duplicateTwo)).toBe(false);
  });

  test("delete valid object", () => {
    expect(dbTwo.delete(duplicateTwo)).toBe(true);
  });

  test("delete invalid object", () => {
    expect(() => dbTwo.delete(invalidTwo)).toThrow();
  });

  test("delete valid object not in db", () => {
    expect(dbTwo.delete(validTwo2)).toBe(false);
  });

  test("update valid object ", () => {
    expect(dbTwo.update(updateTwo)).toBe(true);
  });

  test("update invalid object", () => {
    expect(() => dbTwo.update(invalidTwo)).toThrow();
  });

  test("update valid object not in db", () => {
    expect(dbTwo.update(validTwo2)).toBe(false);
  });

  test("check contents", () => {
    expect(dbTwo.data).toEqual([
      { slug: "plants", name: "qurit" },
      { slug: "post", name: "fred", id: "36632646-eab2-4987-9056-5997dbcda9a7" },
    ]);
  });

  test("delete by key in db", () => {
    expect(dbTwo.deleteByKey("plants")).toBe(true);
  });

  test("delete by key, not in db", () => {
    expect(dbTwo.deleteByKey("plants")).toBe(false);
  });

  test("check contents", () => {
    expect(dbTwo.data).toEqual([
      { slug: "post", name: "fred", id: "36632646-eab2-4987-9056-5997dbcda9a7" },
    ]);
  });
});

describe("Constructor", () => {
  test("Invalid constructor, missing filename", () => {
    expect(() => {const db = new PuffCheeks()}).toThrow("Missing file name!");
  })

  test("Invalid constructor, missing key", () => {
    expect(() => {const db = new PuffCheeks("test")}).toThrow("Missing key name!");
  })

  test("Invalid constructor, wrong key", () => {
    const db = new PuffCheeks("sampleThree", "planet");

    expect(() => {
      const db2 = new PuffCheeks("sampleThree", "pluto")
    }).toThrow("Key does not match saved key");
  })
})
