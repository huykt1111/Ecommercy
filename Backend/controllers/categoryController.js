const Category = require('../models/categoryModel')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res)  => {
        try {
            // If user have role = 1 --> Admin

            // Only admin can create , delete and update categories
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists."})

            const newCategory = await Category({name})
            await newCategory.save()
            res.json({msg: "Create a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {   
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: 'Delete a Category'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) => {
        try {   
            const {name} = req.body
            await Category.findOneAndUpdate({_id: req.params.id},{name})
            
            res.json({msg: 'Update a Category'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}   

module.exports = categoryController