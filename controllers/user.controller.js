const UserModel = require('../db/user.model.js')
const {validationResult} = require('express-validator')

module.exports = {
    async signup(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).send({
                message: "Invalid inputs passed. Please check your data!"
            })
            return
        }

        //create an user
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        })

        //Save costumer in database
        UserModel.create(newUser, (err, data) => {
            if(err){
                if (err.kind === 'ER_DUP_ENTRY') {
                    res.status(422).send({
                        message: "Could not create user. Username already exists."
                    });
                    return
                }
                res.status(500).send({
                    message: err.message || "Some error occurred while adding user."
                })
            }
            else{
                res.send({data})
            }
        })
    },

    async login(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).send({
                message: "Invalid inputs passed. Please check your data!"
            })
            return
        }

        const user = new UserModel({
            username: req.body.username,
            password: req.body.password
        })

        UserModel.login(user, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found user.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error retrieving user "
                  });
                }
              } else res.send('Logged in!');
            }
        );
    }
}