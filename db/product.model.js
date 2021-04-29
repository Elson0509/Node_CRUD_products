const sql = require('./db.js')

const Product = function(product) {
    this.id = product.id
    this.category_id = product.category_id
    this.description = product.description
    this.img = product.img
    this.name = product.name
    this.price = product.price
}

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ? ", newProduct, (err, res) => {
        //console.log(newProduct)
        if(err){
            console.log("error: ", err)
            result(null, err)
            return
        }
        console.log('product created: ', {...newProduct, id: res.insertId})
        result(null, {...newProduct, id: res.insertId});
    })
}

Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if(err){
            console.log("error: ", err)
            result(null, err)
            return
        }
        result(null, res);
    })
}

Product.findById = (productId, result) => {
    sql.query(`SELECT p.id as id, category_id, p.name as name, description, img, price, c.name as category_name FROM products p INNER JOIN categories c on p.category_id = c.id WHERE p.id = ?`, productId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found category with the id
      result({ kind: "not_found" }, null);
    });
};

Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted product with id: ", id);
      result(null, res);
    });
};

Product.updateById = (id, product, result) => {
    sql.query(
      "UPDATE products SET name = ?, img = ?, price = ?, category_id = ?, description = ? WHERE id = ?",
      [product.name, product.img, product.price, product.category_id, product.description, id],
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
  
        console.log("updated product: ", { ...product, id: id });
        result(null, {...product, id: id });
      }
    );
};

module.exports = Product;