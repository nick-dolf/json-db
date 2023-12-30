# Puff Cheeks

Puff Cheeks is local Json database. Objects are stored in an array with a unique key and id.

```js
const PuffCheeks = require("puff-cheeks")

const chipmunks = new PuffCheeks("chipmunk", "name")
```

<a name="PuffCheeks"></a>

## PuffCheeks
**Kind**: global class  

* [PuffCheeks](#PuffCheeks)
    * [new PuffCheeks(fname, key, [folder])](#new_PuffCheeks_new)
    * [.add(object)](#PuffCheeks+add) ⇒ <code>Boolean</code>
    * [.delete(object)](#PuffCheeks+delete) ⇒ <code>Boolean</code>
    * [.deleteByKey(key)](#PuffCheeks+deleteByKey) ⇒ <code>Boolean</code>
    * [.deleteById(id)](#PuffCheeks+deleteById) ⇒ <code>Boolean</code>
    * [.update(object)](#PuffCheeks+update) ⇒ <code>Boolean</code>
    * [.findByKey(key)](#PuffCheeks+findByKey) ⇒ <code>Object</code> \| <code>Boolean</code>
    * [.findById(id)](#PuffCheeks+findById) ⇒ <code>Object</code>
    * [.sortByKey(keys)](#PuffCheeks+sortByKey) ⇒ <code>Boolean</code>

<a name="new_PuffCheeks_new"></a>

### new PuffCheeks(fname, key, [folder])
Creates a new Json Database or opens an existing one


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fname | <code>String</code> |  | File name to store - will append .json if needed |
| key | <code>String</code> |  | Unique key to identify object |
| [folder] | <code>String</code> | <code>&quot;puff_cheeks_storage&quot;</code> | Storage folder |

<a name="PuffCheeks+add"></a>

### puffCheeks.add(object) ⇒ <code>Boolean</code>
Adds a single Object to the front of the array

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Boolean</code> - True if object added, false if object has duplicate key/id  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | add an object, must have matching key parameter |

<a name="PuffCheeks+delete"></a>

### puffCheeks.delete(object) ⇒ <code>Boolean</code>
Deletes an oject from the array

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Boolean</code> - True if object deleted, false if object not in db  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | delete an object, must have matching id parameter |

<a name="PuffCheeks+deleteByKey"></a>

### puffCheeks.deleteByKey(key) ⇒ <code>Boolean</code>
Deletes an object by key

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Boolean</code> - True if object deleted, false if object not in db  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | unique string |

<a name="PuffCheeks+deleteById"></a>

### puffCheeks.deleteById(id) ⇒ <code>Boolean</code>
Deletes an object by ID

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Boolean</code> - True if object deleted, false if object not in db  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | A unique number (UUID) |

<a name="PuffCheeks+update"></a>

### puffCheeks.update(object) ⇒ <code>Boolean</code>
Updates objects

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Boolean</code> - True if object updated, false if object not in db  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Must have matching key |

<a name="PuffCheeks+findByKey"></a>

### puffCheeks.findByKey(key) ⇒ <code>Object</code> \| <code>Boolean</code>
Finds object by key

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Object</code> \| <code>Boolean</code> - Object if found, false if object not in db  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | unique string |

<a name="PuffCheeks+findById"></a>

### puffCheeks.findById(id) ⇒ <code>Object</code>
Finds object by Id

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Object</code> - Object if found, false if object not in db  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | unique string |

<a name="PuffCheeks+sortByKey"></a>

### puffCheeks.sortByKey(keys) ⇒ <code>Boolean</code>
Sorts the Data array using an ordered array of keys

**Kind**: instance method of [<code>PuffCheeks</code>](#PuffCheeks)  
**Returns**: <code>Boolean</code> - - true if sorted, false if failed  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>Array</code> | Array of keys |


* * *

&copy; 2023 Nick Dolf