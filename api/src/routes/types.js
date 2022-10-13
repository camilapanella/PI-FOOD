const express = require('express')
const { Router } = require('express');
const {Diet} = require('../db');

const router = Router();

const addDiets = async () => {
    const types = [{name: 'gluten free'},
    {name: 'ketogenic'},
    {name: 'vegetarian'},
    {name: 'lacto-vegetarian'},
	{name: 'lacto ovo vegetarian'},
    {name: 'vegan'},
    {name: 'pescatarian'},
    {name: 'paleolithic'},
    {name: 'primal'},
	{name: 'whole 30'}];

   const newList = await Diet.bulkCreate(types);
   return newList;
}

router.get('/', async (req, res) => {
    const diets = await Diet.findAll()
    try {
        if(!diets.length){
            var listDiets = await addDiets()
            return listDiets
          }
          res.status(200).send(diets)
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router


