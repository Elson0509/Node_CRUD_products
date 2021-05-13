const UserModel = require('../db/user.model.js')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    async signup(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).send({
                message: "Invalid inputs passed. Please check your data!"
            })
            return
        }

        //hashing password
        let hashedPassword
        try{
        hashedPassword = await bcrypt.hash(req.body.password, 12)
        } catch (err){
            res.status(500).send({
                message: err.message || "Could not creat user. Please try again."
            })
            return
        }

        //create an user
        const newUser = new UserModel({
            username: req.body.username,
            password: hashedPassword
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
                let token
                try{
                    token = jwt.sign({userId: data.id, username: data.username}, process.env.JWT_TOKEN_PRIVATE_KEY)
                }
                catch(error){
                    res.status(500).send({
                        message: err.message || "Some error occurred while adding user."
                    })
                    return
                }
                res.send({userId: data.id, username: data.username, token})
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

        UserModel.login(user, async (err, data) => {
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
              } else {
                  //user found
                  //validating hash
                  let isValidPassword = false
                  try{
                    isValidPassword = await bcrypt.compare(req.body.password, data.password)
                  } catch(error){
                    res.status(500).send({
                        message: `Could not login. Please check your credentials.`
                      });
                      return
                  }
                  if(isValidPassword){
                    let token
                    try{
                        token = jwt.sign({userId: data.id, username: data.username}, process.env.JWT_TOKEN_PRIVATE_KEY)
                    }
                    catch(error){
                        res.status(500).send({
                            message: err.message || "Some error occurred while logging user."
                        })
                        return
                    }
                    res.send({userId: data.id, username: data.username, token})
                    //res.send('Logged in!')
                  }
                  else{
                    res.status(500).send({
                        message: `Could not login. Please check your credentials.`
                      });
                  }
              }
            }
        );
    },

    async findByToken(req, res){
        try{
            const token = req.params.token
            //console.log({token})
            if(!token){
                res.status(401).send({
                    message:  "Authentication failed."
                })
                return 
            }
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY) //validating token
            res.send({id: decodedToken.userId, username: decodedToken.username})
        }catch(err){
            res.status(401).send({
                message:  "Authentication failed."
            })
            return 
        }
    },
}