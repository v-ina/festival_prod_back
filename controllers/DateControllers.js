const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')

const findAllDates = (req, res) => {
    Date.findAll()
    .then((result)=>{ res.json({message : `il y a ${result.length} Suggestions`, data : result}) })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}

module.exports = { findAllDates }