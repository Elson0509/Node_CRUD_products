const ProductModel = require('../db/product.model.js')
const path= require("path");

module.exports = {
    async create(req, res){
        //validate request
        if(!req.body){
            res.status(400).send({
                message: "content can not be empty!"
            })
        }
        //create a category
        const newProduct = new ProductModel({
            name: req.body.name,
            category_id: req.body.category_id,
            description: req.body.description,
            img: req.body.img,
            price: req.body.price,
        })

        //Save product in database
        ProductModel.create(newProduct, (err, data) => {
            if(err)
                res.status(500).send({
                    message: err.message || "Some error occurred while adding product."
                })
            else{
                res.send({data})
            }

        })
    },

    async saveImg(req, res){
      console.log('saveimg', req.params)

      // Validate Request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      ProductModel.updateImgById(
        req.params.productId,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Product with id ${req.params.productId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating img Product with id " + req.params.productId
              });
            }
          } else res.send(data);
        }
      );

      

    },

    async findAll(req, res){
      ProductModel.getAll((err, data) => {
            if(err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving products."
                })
            else{
                res.render('index', {data: data})
            }
        })
    },

    async find(req, res){
      ProductModel.findById(req.params.productId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found category with id ${req.params.productId}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error retrieving category with id " + req.params.productId
                  });
                }
              } else res.send(data);
            }
        );
    },

    async remove(req, res){
        ProductModel.remove(req.params.productId, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Product with id ${req.params.productId}.`
                });
              } else {
                res.status(500).send({
                  message: "Could not delete Product with id " + req.params.productId
                });
              }
            } else res.send({ message: `Product was deleted successfully!` });
          }
        );
    },

    async update(req, res){
        // Validate Request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        ProductModel.updateById(
          req.params.productId,
          new ProductModel(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Product with id ${req.params.productId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Product with id " + req.params.productId
                });
              }
            } else res.send(data);
          }
        );
    }
}

