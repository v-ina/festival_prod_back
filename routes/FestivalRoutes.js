const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer-config-festivals')


const { findAllFestivals, findFestivalByPk, createFestival, updateFestival, deleteFestival } = require('../controllers/FestivalControllers')
const { protect, restrict } = require('../controllers/AuthControllers')



router
    .route('')
    .get(findAllFestivals)
    .post(protect, restrict, multer, createFestival)

router
    .route('/:id')
    .get(findFestivalByPk)
    .put(protect, restrict, multer, updateFestival)
    .delete(protect, restrict, deleteFestival)

module.exports = router