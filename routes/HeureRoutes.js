const express = require('express')
const router = express.Router()

const { findAllHeures } = require('../controllers/HeureControllers')


router
    .route('/')
    .get(findAllHeures)
    
module.exports = router