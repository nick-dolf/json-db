const JsonDb = require("../src/JsonDb")
const path = require("path")
const fs = require('fs')

fs.rmSync(path.join(process.cwd(),"json_db_storage/"), {recursive: true, force: true})

fs.mkdirSync(path.join(process.cwd(), "json_db_storage_two"), { recursive: true });

fs.writeFileSync(path.join(process.cwd(), "json_db_storage_two", "sampleTwo.json"), JSON.stringify([{slug: "tree", name:"flurgl"},{slug: "post", name:"fred"}]))


describe("JsonDB('sample')", () => {
  const db = new JsonDb("sample")
  const valid1 = {id: "tree", name:"john"}
  const valid2 = {id: "post", name:"fred"}
  const invalid = {door: 40, name:"john"}
  const duplicate = {id: "tree", name:"flurgl"}

  test("filePath", () => {
    expect(db.filePath).toBe(path.join(process.cwd(),"json_db_storage/sample.json"));
  });

  test("id", () => {
    expect(db.id).toBe("id")
  })

  test("add valid object", () => {
    expect(db.add(valid1)).toBe(true)
  })

  test("add second valid object", () => {
    expect(db.add(valid2)).toBe(true)
  })

  test("add invalid object", () => {
    expect(() => db.add(invalid)).toThrow("Object missing valid id")
  })

  test("add duplicate id object", () => {
    expect(db.add(duplicate)).toBe(false)
  })

  test("check contents", () => {
    expect(db.data).toEqual([valid2, valid1])
  })
})

describe("JsonDB('sampleTwo'), slug, json_db_storage_two", () => {
  const dbTwo = new JsonDb("sampleTwo.json", "slug", "json_db_storage_two")
  const validTwo = {slug:"plants", name:"Grappt"}
  const validTwo2 = {slug:"rose", name:"Loppe"}
  const invalidTwo = {id:"pla", name:"Twille"}
  const duplicateTwo = {slug: "tree", name:"qurit"}
  const updateTwo = {slug: "plants", name:"qurit"}

  test("filePath", () => {
    expect(dbTwo.filePath).toBe(path.join(process.cwd(),"json_db_storage_two/sampleTwo.json"));
  });

  test("id", () => {
    expect(dbTwo.id).toBe("slug")
  })

  test("add valid object", () => {
    expect(dbTwo.add(validTwo)).toBe(true)
  })
  
  test("add invalid object", () => {
    expect(() => dbTwo.add(invalidTwo)).toThrow("Object missing valid id")
  })
  
  test("add duplicate object", () => {
    expect(dbTwo.add(duplicateTwo)).toBe(false)
  })

  test("delete valid object", () => {
    expect(dbTwo.delete(duplicateTwo)).toBe(true)
  })
  
  test("delete invalid object", () => {
    expect(() => dbTwo.delete(invalidTwo)).toThrow()
  })
  
  test("delete valid object not in db", () => {
    expect(dbTwo.delete(validTwo2)).toBe(false)
  })
  
  test("update valid object ", () => {
    expect(dbTwo.update(updateTwo)).toBe(true)
  })
  
  test("update invalid object", () => {
    expect(() => dbTwo.update(invalidTwo)).toThrow()
  })

  test("update valid object not in db", () => {
    expect(dbTwo.update(validTwo2)).toBe(false)
  })

  test("check contents", () => {
    expect(dbTwo.data).toEqual([{slug:"plants", name:"qurit"},{slug: "post", name:"fred"}])
  })
})