const express = require('express')
const router = express.Router()

const { createUser, deleteUser } = require('../controllers/UserControllers')
const { login, protect, restrict } = require('../controllers/AuthControllers')


router
    .route('/')
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .delete(protect, restrict, deleteUser)
    
module.exports = router