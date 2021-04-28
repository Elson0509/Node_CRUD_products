const express = require('express')
const { remove } = require('../db/category.model.js')
const CategoryModel = require('../db/category.model.js')

module.exports = {
    async create(req, res){
        //validate request
        if(!req.body){
            res.status(400).send({
                message: "content can not be empty!"
            })
        }

        console.log(req.body)
        //create a category
        const newCategory = new CategoryModel({
            name: req.body.name
        })

        //Save costumer in database
        CategoryModel.create(newCategory, (err, data) => {
            if(err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving categories."
                })
            else{
                res.send({data})
            }

        })
    },

    async findAll(req, res){
        CategoryModel.getAll((err, data) => {
            if(err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving categories."
                })
            else{
                res.render('index', {data: data})
            }
        })
    },

    async find(req, res){
        CategoryModel.findById(req.params.categoryId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found category with id ${req.params.customerId}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error retrieving category with id " + req.params.customerId
                  });
                }
              } else res.send(data);
            }
        );
    },

    async remove(req, res){
        CategoryModel.remove(req.params.categoryId, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Category with id ${req.params.categoryId}.`
                });
              } else {
                res.status(500).send({
                  message: "Could not delete Category with id " + req.params.categoryId
                });
              }
            } else res.send({ message: `Category was deleted successfully!` });
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
      
        CategoryModel.updateById(
          req.params.categoryId,
          new CategoryModel(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Category with id ${req.params.categoryId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Category with id " + req.params.categoryId
                });
              }
            } else res.send(data);
          }
        );
      }

    
}

