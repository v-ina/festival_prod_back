const express = require('express')
const router = express.Router()

const { findAllDates } = require('../controllers/DateControllers')


router
    .route('/')
    .get(findAllDates)
    
module.exports = router

