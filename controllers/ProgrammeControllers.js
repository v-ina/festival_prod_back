const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')

const { ValidationError, UniqueConstraintError } = require('sequelize')


const findAllProgrammes = (req, res) => {
    Programme.findAll()
    .then((result)=>{ res.json({message : `il y a ${result.length} Programmes`, data : result}) })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


const findProgrammeByPk = (req, res) => {
    Programme.findByPk(req.params.id)
    .then((result)=>{
        if(!result){ 
            return res.status(404).json({message : `on peut pas trouver Programme n° ${req.params.id}`})
        }
        res.json({message : `c'est l'Programme id n° ${req.params.id}`, data : result})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


const createProgramme =(req,res)=>{
    User.findOne({where : {email : req.email}})
    .then(foundUser =>{
        if(!foundUser){
            return res.status(404).json({message : `L'utilisateur n'a pas été trouvé`})
        }
        const userIdWhoCreate = foundUser.id
        if(req.files){
            const fileInfos = req.files
            const uploadedFiles = []
            fileInfos.forEach((file, index)=>{
                let filename = `${req.protocol}://${req.get('host')}/multer-Programmes/${file.filename}`
                uploadedFiles.push(filename)
            })
            return Programme.create({...req.body, userId : userIdWhoCreate, photo : uploadedFiles }) 
            .then((result)=>{
                res.json({message : "l'Programme a bien ete ajoute" , data : result})
            })
        } else {
            return Programme.create({...req.body, userId : userIdWhoCreate, photo: null}) 
            .then((result)=>{
                res.json({message : 'le coworking a bien ete ajoute' , data : result})
            })
        }
    })
    .catch((error)=> {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({ message: 'Une erreur est survenue.', data: error.message })
        }
        res.status(500).json({message : 'une erreur est survenue', data : error.message}) 
    })
}


const updateProgramme = (req,res) =>{
    Programme.findByPk(req.params.id)
    .then((result) => {
        if (result) {
            if(!req.files){
                return result.update(req.body)
                .then(() => {
                    res.json({ message: `l'Programme a bien été mis à jour.`, data: result })
                })
            } else {
                result.photo = []
                const fileInfos = req.files
                const updatedFiles = []
                fileInfos.forEach(file=>{
                    let filename = `${req.protocol}://${req.get('host')}/multer-Programmes/${file.filename}`
                    updatedFiles.push(filename)
                })
                return result.update({...req.body, photo : updatedFiles})
                .then(() => {
                    res.json({ message: `L'Programme a bien été mis à jour.`, data: result })
                })
            }
        } else {
            res.status(404).json({ message: `Aucun Programme à mettre à jour n'a été mis à jour.` })
        }
    })
    .catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({ message: 'Une erreur est survenue.', data: error.message })
        }
        res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
    })
}


const deleteProgramme = (req, res) => {
    if(!req.params.id){
        return res.status(404).json({message : `on peut pas trouver Programme n° ${req.params.id}`})
    }
    Programme.findByPk(req.params.id)
    .then((afterFindByPk)=>{
        return afterFindByPk.destroy()
        .then(()=>{res.json({message : `on a bien supprime Programme n° ${req.params.id}`, data : afterFindByPk})})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


module.exports = { findAllProgrammes, findProgrammeByPk, createProgramme, updateProgramme, deleteProgramme }