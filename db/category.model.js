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

module.exports = Category;