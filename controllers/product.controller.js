const ProductModel = require('../db/product.model.js')
const CategoryModel = require('../db/category.model.js')
const fs = require('fs')
const imgPath= './public/img';

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
              //getting all categories
              CategoryModel.getAll((errCat, dataCat) => {
                if(errCat)
                    res.status(500).send({
                        message: errCat.message || "Some error occurred while retrieving categories."
                    })
                else{
                    res.render('allproducts', {data: data, categories: dataCat})
                }
              })
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
            } else {
              //deleting img
              try{
                const path = `${imgPath}/${req.params.productId}.jpg`
                fs.unlinkSync(path)
                res.send({ message: `Product was deleted successfully!` });
              }catch(error){
                res.status(500).send({
                  message: "Could not delete Product img with id " + req.params.productId
                });
              }
            }
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

