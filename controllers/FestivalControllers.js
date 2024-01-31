const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')

const { ValidationError, UniqueConstraintError } = require('sequelize')


const findAllFestivals = (req, res) => {
    Festival.findAll()
    .then((result)=>{ res.json({message : `il y a ${result.length} Festivals`, data : result}) })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


const findFestivalByPk = (req, res) => {
    Festival.findByPk(req.params.id)
    .then((result)=>{
        if(!result){ 
            return res.status(404).json({message : `on peut pas trouver Festival n° ${req.params.id}`})
        }
        res.json({message : `c'est l'Festival id n° ${req.params.id}`, data : result})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}



const createFestival =(req,res)=>{
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
                let filename = `${req.protocol}://${req.get('host')}/multer-festivals/${file.filename}`
                uploadedFiles.push(filename)
            })
            return Festival.create({...req.body, userId : userIdWhoCreate, images : uploadedFiles }) 
            .then((result)=>{
                res.json({message : "l'Festival a bien ete ajoute" , data : result})
            })
        } else {
            return Festival.create({...req.body, userId : userIdWhoCreate, images: null}) 
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


const updateFestival = (req,res) =>{
    Festival.findByPk(req.params.id)
    .then((result) => {
        if (result) {
            if(!req.files){
                return result.update(req.body)
                .then(() => {
                    res.json({ message: `l'Festival a bien été mis à jour.`, data: result })
                })
            } else {
                result.images = []
                const fileInfos = req.files
                const updatedFiles = []
                fileInfos.forEach(file=>{
                    let filename = `${req.protocol}://${req.get('host')}/multer-festivals/${file.filename}`
                    updatedFiles.push(filename)
                })
                return result.update({...req.body, images : updatedFiles})
                .then(() => {
                    res.json({ message: `L'Festival a bien été mis à jour.`, data: result })
                })
            }
        } else {
            res.status(404).json({ message: `Aucun festival à mettre à jour n'a été mis à jour.` })
        }
    })
    .catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({ message: 'Une erreur est survenue.', data: error.message })
        }
        res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
    })
}





// const createFestival = (req, res) => {
//     User.findOne({where : {email : req.email}})
//     .then((afterFindOne)=>{
//         if(!afterFindOne){
//             return res.status(404).json({message : `L'utilisateur n'a pas été trouvé`})
//         }
//         return Festival.create({...req.body, userId : afterFindOne.id})
//         .then((result)=>{res.json({message : `on a bien cree un nouveau Festival`, data : result})})
//     })
//     .catch((error)=>{ 
//         if(error instanceof ValidationError){
//             return res.json({message : error.message})
//         }
//         res.status(500).json({message : `il y a une erreur`, error : error.message})
//     })
// }


// const updateFestival = (req, res) => {
//     if(!req.params.id){
//         return res.status(404).json({message : `on peut pas trouver Festival n° ${req.params.id}`})
//     }
//     Festival.findByPk(req.params.id)
//     .then((afterFindByPk)=>{
//         return afterFindByPk.update({text : req.body.text})
//         .then((afterUpdate)=>{res.json({message : `on a bien fait un mis a jour d'Festival n° ${req.params.id}`, data : afterUpdate})})
//     })
//     .catch((error)=>{ 
//         if(error instanceof ValidationError || error instanceof UniqueConstraintError){
//             return res.json({message : error.message})
//         }
//         res.status(500).json({message : `il y a une erreur`, error : error.message})
//     })
// }


const deleteFestival = (req, res) => {
    if(!req.params.id){
        return res.status(404).json({message : `on peut pas trouver Festival n° ${req.params.id}`})
    }
    Festival.findByPk(req.params.id)
    .then((afterFindByPk)=>{
        return afterFindByPk.destroy()
        .then(()=>{res.json({message : `on a bien supprime Festival n° ${req.params.id}`, data : afterFindByPk})})
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}


module.exports = { findAllFestivals, findFestivalByPk, createFestival, updateFestival, deleteFestival }