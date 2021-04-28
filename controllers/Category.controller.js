const express = require('express')
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
}

