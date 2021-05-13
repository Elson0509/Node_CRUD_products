const sql = require('./db.js')

const Category = function(category) {
    this.id = category.id
    this.name = category.name
}

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO categories SET ? ", newCategory, (err, res) => {
        if(err){
            console.log("error: ", err)
            result(err, null);
            return
        }
        //console.log('category created: ', {...newCategory, id: res.insertId })
        result(null, {...newCategory, id: res.insertId });
    })
}

Category.getAll = result => {
    sql.query("SELECT * FROM categories", (err, res) => {
        if(err){
            console.log('Category.getAll', "error: ", err)
            result(err, null);
            return
        }
        result(null, res);
    })
}

Category.findById = (categoryId, result) => {
  //console.log(categoryId)
    sql.query(`SELECT p.id as id, category_id, p.name as name, description, img, price, c.name as category_name FROM products p INNER JOIN categories c on p.category_id = c.id WHERE c.id = ?`, categoryId, (err, res) => {
    //sql.query(`SELECT * FROM categories WHERE id = ?`, categoryId, (err, res) => {
      if (err) {
        //console.log('Category.findById', "error: ", err);
        result(err, null);
        return;
      }
      else {
        //console.log('Category.findById', "found category: ", res);
        result(null, res);
        return;
      }
    });
};

Category.remove = (id, result) => {
    sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      //console.log("deleted category with id: ", id);
      result(null, res);
    });
};

Category.updateById = (id, category, result) => {
    sql.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [category.name, id],
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        //console.log("updated category: ", { ...category, id: id });
        result(null, { ...category, id: id });
      }
    );
};

module.exports = Category;