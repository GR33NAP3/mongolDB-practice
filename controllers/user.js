const router = require('express').Router()
const User = require("../models/user")

//get retreive all users
router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(error){
        console.log(error)
        res.json({ 'message': 'error retrieving users' })
    }
})

//get retrieve user by username
router.get('/username/:username', async (req,res) => {
    const { username } = req.params
    try {
        const users = await User.find({ username })
        res.json(users)
    } catch (error){
        console.log(error)
        res.json({'message': 'error retrieving user' })
    }    
})

//get retrieve user by id
router.get('/id/:id', async (req,res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error){
        console.log(error)
        res.json({'message': 'error retrieving user' })
    }    
})

//delete user by id
router.delete('/id/:id', async (req,res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            res.status(404).json({ 'message': 'user doesn\'t exist' })
        }else{
            res.json({ 'message': 'user deleted' })
        }
    } catch (error){
        console.log(error)
        res.json({'message': 'error retrieving user' })
    }    
})

//post create user
router.post('/', async (req,res) => {
    try {
        // const { username, email, age, location } = req.body
        const createdUser = await new User(req.body).save() 
        res.json(createdUser)
    } catch(error) {
        console.log(error)
        res.json({ 'message' : 'error creating user'  })
    }
})

module.exports = router