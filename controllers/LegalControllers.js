const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')

const findAllLegals = (req,res) => {
    Legal.findAll()
    .then((result)=>{ res.json({message : `il y a ${result.length} Legal`, data : result}) })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}

const createLegal = (req, res) => {
    User.findOne({where : {email : req.email}})
    .then((afterFindOne)=>{
        if(!afterFindOne){
            return res.status(404).json({message : `L'utilisateur n'a pas été trouvé`})
        }
        return Legal.create({...req.body, userId : afterFindOne.id})
        .then((result)=>{res.json({message : `on a bien cree un nouveau Legal`, data : result})})
    })
    .catch((error)=>{ 
        if(error instanceof ValidationError){
            return res.json({message : error.message})
        }
        res.status(500).json({message : `il y a une erreur`, error : error.message})
    })
}


const updateLegal = (req, res) => {
    if(!req.params.id){
        return res.status(404).json({message : `on peut pas trouver Legal n° ${req.params.id}`})
    }
    Legal.findByPk(req.params.id)
    .then((afterFindByPk)=>{
        return afterFindByPk.update({text : req.body.text})
        .then((afterUpdate)=>{res.json({message : `on a bien fait un mis a jour d'Legal n° ${req.params.id}`, data : afterUpdate})})
    })
    .catch((error)=>{ 
        if(error instanceof ValidationError || error instanceof UniqueConstraintError){
            return res.json({message : error.message})
        }
        res.status(500).json({message : `il y a une erreur`, error : error.message})
    })
}

module.exports = { findAllLegals, createLegal, updateLegal }