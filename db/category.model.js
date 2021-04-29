const sql = require('./db.js')

const Category = function(category) {
    this.id = category.id
    this.name = category.name
}

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO categories SET ? ", newCategory, (err, res) => {
        //console.log(newCategory)
        if(err){
            console.log("error: ", err)
            result(null, err)
            return
        }
        console.log('category created: ', {id: res.insertId, ...newCategory})
        result(null, {id: res.insertId, ...newCategory});
    })
}

Category.getAll = result => {
    sql.query("SELECT * FROM categories", (err, res) => {
        if(err){
            console.log("error: ", err)
            result(null, err)
            return
        }
        result(null, res);
    })
}

Category.findById = (categoryId, result) => {
    sql.query(`SELECT * FROM categories WHERE id = ?`, categoryId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found category: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found category with the id
      result({ kind: "not_found" }, null);
    });
};

Category.remove = (id, result) => {
    sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted category with id: ", id);
      result(null, res);
    });
};

Category.updateById = (id, category, result) => {
    sql.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [category.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated category: ", { ...category, id: id });
        result(null, { ...category, id: id });
      }
    );
};

module.exports = Category;