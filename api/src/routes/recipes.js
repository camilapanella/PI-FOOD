const express = require('express')
const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');
const {YOUR_API_KEY} = process.env;

const router = Router();

const getApiInfo = async () => {
    const dataAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)
    const result = dataAxios.data.results
    let filt = result.map(el => {
        return{
            id:el.id,
            name:el.title,
            image:el.image,
            summary:el.summary,
            healthScore:el.healthScore,
            diets:el.diets?.map(e=>e),
            steps:el.analyzedInstructions.map(ins => {
            return ins.steps.map(st => st.step)
           }).join(" \n")
        }
    })
    return filt
}
const getDbInfo = async () => {
    const data = await Recipe.findAll({ 
        include:{
            model:Diet,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
    if(data){
        let response = await data.map(el =>{
            return{
            id:el.id,
            name:el.name,
            image:el.image,
            summary:el.summary,
            healthScore:el.healthScore,
            diets:el.diets?.map(e=>e.name),
            steps:el.steps
            }
        })
        return response;
    }
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allRecipes = dbInfo.concat(apiInfo);
    return allRecipes;
  };

  
router.get('/', async(req, res) => {
    const {name} = req.query
    const allRecipes = await getAllRecipes()
    if(name){
        let recByName = await allRecipes.filter(el =>{
            return el.name.toLowerCase().includes(name.toLowerCase())
        })
    if(recByName.length) return res.status(200).send(recByName)
    else return res.status(400).send('This recipe does not exist')
    }
    res.status(200).send(allRecipes)
})

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const allRes = await getAllRecipes()
    let validate = id.includes("-");
    if(validate){
        let dbId = await Recipe.findByPk(id, { include: Diet })
        if(dbId) return res.status(200).send(dbId)
    }
    if(id){
        let recipeId = await allRes.filter(el => el.id == id);
        if(recipeId.length) return res.status(200).send(recipeId)
        return res.status(404).send('Recipe not found')
    }
});


router.post('/', async (req, res) => {
    const {id,name,image,summary,healthScore,steps, diets} = req.body
    try {
        if(!name || !summary) return res.status(400).send('Mandatory data missing')
        const newRec = await Recipe.create({id,name,image,summary, healthScore, steps})

        let dietDb = await Diet.findAll({ where:{ name:diets } })
        newRec.addDiet(dietDb)
        res.status(200).send(newRec)
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router;