const express = require('express')
const router = express.Router()

const { findAllLegals, createLegal, updateLegal } = require('../controllers/LegalControllers')
const { protect, restrict } = require('../controllers/AuthControllers')


router
    .route('/')
    .get(findAllLegals)
    .post(protect, restrict, createLegal)

router
    .route('/:id')
    .put(protect, restrict, updateLegal)
    
module.exports = router