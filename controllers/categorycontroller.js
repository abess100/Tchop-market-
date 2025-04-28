const express = require("express");
const category = require("../models/categoryModel");
const products = require("../models/produitModel");

// Get all category
const getallCategory = async (req, res) => {
    try {
        const categories = await category.find()
        res.status(200).send({
            message: "liste de toutes les catégories", 
            categories})
    } catch (error) {
        res.status(500).send({message: "erreur lors de la récupération des catégories"})
    }
}

// Get one category
const getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categorie = await category.findById(categoryId)
        if (!categorie) {
            return res.status(404).send({message: "catégorie non trouvée"})
        }
        res.status(200).send({message: "catégorie trouvée", categorie})
    } catch (error) {
        res.status(500).send({message: "erreur lors de la récupération des catégories"})
    }
}

// create une nouvelle categorie
const createCategory = async (req, res) => {
    try{
        const { name }= req.body;
        console.log(name);
        
        // validation
        if (!name) {
            return res.status(400).send({message: "veuillez remplir le champs"})
        }
        // check if the category already exists
        const existCategorie = await category.findOne({name})
        console.log(existCategorie);
        
        if (existCategorie) {
            return res.status(400).send({message: "la catégorie existe déjà"})
        }

        await category.create({name})
        res.status(201).send({message: "la catégorie a été créée avec succès"})
    }catch (error) {
        res.status(500).send({message: "erreur lors de la création de la catégorie"})
    }
}

// mettre à jour une catégorie
const updateCategory = async (req, res) => {
    try{
        const  categoryId = req.params.id;
        console.log(categoryId)

        const categorie = await category.findById(categoryId)
        if (!categorie) {
            return res.status(404).send({message: "catégorie non trouvée"})
        }

        const {name} = req.body;
        if (!name) {
            return res.status(400).send({message: "veuillez remplir le champs"})
        }
        // check if the category already exists
        await category.findByIdAndUpdate(categoryId, {name})
        res.status(200).send({message: "la catégorie a été mise à jour avec succès"})


    }catch (error) {
        res.status(500).send({message: "erreur lors de la mise à jour de la catégorie"})
    }

}


// supprimer une catégorie
const deleteCategory = async (req,res) => {
    const categoryId = req.params.id;
    try {
        const categorie = await category.findById(categoryId)
        if (!categorie) {            
            return res.status(404).send({message: "catégorie non trouvée"})
        }

        // chercher la catégorie dans les produits
        const produits = await products.find({categorie: categoryId})  
        res.status(200).send({message: "produits trouvés", produits})     
        
        // Mettez à jour chaque produit pour définir `categorie` à `undefined`
        for (let i =0; i < produit.lenght; i++) {
            const produit = produits[i];
            produit.categorie = " "; // Définir la catégorie à `undefined`
            await produit.save(); 
        }
        // Supprimez la catégorie
        await category.findByIdAndDelete(categoryId)
        res.status(200).send({message: "la catégorie a été supprimée avec succès"})
    } catch (error) {
        res.status(500).send({
            message: "erreur lors de la suppression de la catégorie", 
            error
        })

    }
}

module.exports = {getallCategory,getCategory ,createCategory, updateCategory, deleteCategory}