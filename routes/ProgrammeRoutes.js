const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer-config-programmes')


const { findAllProgrammes, findProgrammeByPk, createProgramme, updateProgramme, deleteProgramme } = require('../controllers/ProgrammeControllers')
const { protect, restrict } = require('../controllers/AuthControllers')



router
    .route('')
    .get(findAllProgrammes)
    .post(protect, restrict, multer, createProgramme)

router
    .route('/:id')
    .get(findProgrammeByPk)
    .put(protect, restrict, multer, updateProgramme)
    .delete(protect, restrict, deleteProgramme)

module.exports = router