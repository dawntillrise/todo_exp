const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({})
    
    res.render('index', {
        title: 'Todo list',
        isIndex: true
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

module.exports = router