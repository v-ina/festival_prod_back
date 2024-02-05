const express = require('express')
const router = express.Router()

const { findAllReservations, findReservationByPk, createReservation, updateReservation, deleteReservation } = require('../controllers/ReservationControllers')
const { protect, restrict } = require('../controllers/AuthControllers')


router
    .route('')
    .get(findAllReservations)
    .post(createReservation)

router
    .route('/:id')
    .get(findReservationByPk)
    .put(protect, restrict, updateReservation)
    .delete(protect, restrict, deleteReservation)


module.exports = router