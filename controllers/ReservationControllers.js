const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')

const { ValidationError, UniqueConstraintError } = require('sequelize')


const findAllReservations = (req, res) => {
    Reservation.findAll()
    .then((result)=>{ res.json({message : `il y a ${result.length} Reservations`, data : result}) })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


const findReservationByPk = (req, res) => {
    Reservation.findByPk(req.params.id)
    .then((result)=>{
        if(!result){ 
            return res.status(404).json({message : `on peut pas trouver Reservation n° ${req.params.id}`})
        }
        res.json({message : `c'est l'Reservation id n° ${req.params.id}`, data : result})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


const createReservation = (req, res) => {
    Reservation.create({...req.body})
    .then((result)=>{res.json({message : `on a bien cree un nouveau Reservation`, data : result})})
    .catch((error)=>{ 
        if(error instanceof ValidationError){
            return res.json({message : error.message})
        }
        res.status(500).json({message : `il y a une erreur`, error : error.message})
    })
}


const updateReservation = (req, res) => {
    if(!req.params.id){
        return res.status(404).json({message : `on peut pas trouver Reservation n° ${req.params.id}`})
    }
    Reservation.findByPk(req.params.id)
    .then((afterFindByPk)=>{
        return afterFindByPk.update({...req.body})
        .then((afterUpdate)=>{res.json({message : `on a bien fait un mis a jour d'Reservation n° ${req.params.id}`, data : afterUpdate})})
    })
    .catch((error)=>{ 
        if(error instanceof ValidationError || error instanceof UniqueConstraintError){
            return res.json({message : error.message})
        }
        res.status(500).json({message : `il y a une erreur`, error : error.message})
    })
}


const deleteReservation = (req, res) => {
    if(!req.params.id){
        return res.status(404).json({message : `on peut pas trouver Reservation n° ${req.params.id}`})
    }
    Reservation.findByPk(req.params.id)
    .then((afterFindByPk)=>{
        return afterFindByPk.destroy()
        .then(()=>{res.json({message : `on a bien supprime Reservation n° ${req.params.id}`, data : afterFindByPk})})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


module.exports = { findAllReservations, findReservationByPk, createReservation, updateReservation, deleteReservation }