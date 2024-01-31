const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')
const { ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')

const createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then((hashResult)=>{
        User.create({...req.body, password: hashResult, roleId : 3})
        .then((result)=>{res.json({message : `on a bien cree un nouveau utilisateur`, data : result})})
        .catch((error)=>{ 
            if(error instanceof ValidationError || error instanceof UniqueConstraintError){
                return res.status(501).json({message : error.message})
            }
            res.status(502).json({message : `il y a une erreur`, error : error.message})
        })
    })
    .catch((error)=>{ res.status(503).json({message : `il y a une erreur a hasher`, error : error.message})})
}


const deleteUser = (req, res) => {
    if(!req.params.id){
        return res.status(404).json({message : `on peut pas trouver utilisateur n° ${req.params.id}`})
    }
    User.findByPk(req.params.id)
    .then((afterFindByPk)=>{
        return afterFindByPk.destroy()
        .then(()=>{res.json({message : `on a bien supprime utilisateur n° ${req.params.id}`, data : afterFindByPk})})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


module.exports = { createUser, deleteUser }