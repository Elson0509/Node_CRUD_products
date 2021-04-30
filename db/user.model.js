const sql = require('./db.js')

const User = function(user) {
    this.id = user.id
    this.username = user.username
    this.password = user.password
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ? ", newUser, (err, res) => {
        if(err){
            if(err.code == 'ER_DUP_ENTRY'){
                result({ kind: err.code }, null);
                return
            }
            console.log("error: ", err)
            result(err, null)
            return
        }
        console.log('user created: ', {...newUser, id: res.insertId})
        result(null, {...newUser, id: res.insertId});
    })
}

User.login = (user, result) => {
    sql.query(`SELECT * from users WHERE users.username = ? `, [user.username], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user
      result({ kind: "not_found" }, null);
    });
};

module.exports = User;