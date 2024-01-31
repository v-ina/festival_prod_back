const programmes = require('./mock-programme')
const reservations = require('./mock-reservation')
const festival = require('./mock-festival')
const users = require('./mock-user')
const bcrypt = require('bcrypt')


const setProgramme = (Programme) => {
    return Promise.all(programmes.map(element => {
        const newProgramme = {...element}
        return Programme.create(newProgramme)
        .then(()=>{})
        .catch(error => {console.log(error.message)})
    }))
}

const setUser = (User) => {
    return Promise.all(users.map(user =>{
        bcrypt.hash(user.password, 10)
        .then((hashResult)=>{
            User.create({...user, password : hashResult})
            .then(()=>{})
            .catch(error =>{console.log(error.message)})      
        })
        .catch((error)=>{ res.json({message : `il y a une erruer a hasher`, error : error.message})})
    })   )
}

const setRoles = (Role) => {
    return Promise.all([
        Role.create({"id" : "1" , "label" : "admin"}),
        Role.create({"id" : "2" , "label" : "user"})
    ])
}

const setDate = (Date) => {
    return Promise.all([
        Date.create({"id" : 1, "date" : "2024-07-05"}),
        Date.create({"id" : 2, "date" : "2024-07-06"}),
        Date.create({"id" : 3, "date" : "2024-07-07"})
    ])
}

const setHeure = (Heure) => {
    return Promise.all([
        Heure.create({"id" : 1, "heure" : "17"}),
        Heure.create({"id" : 2, "heure" : "18"}),
        Heure.create({"id" : 3, "heure" : "19"}),
        Heure.create({"id" : 4, "heure" : "20"}),
        Heure.create({"id" : 5, "heure" : "21"}),
        Heure.create({"id" : 6, "heure" : "22"}),
        Heure.create({"id" : 7, "heure" : "23"})
    ])
}

const setReservation = (Reservation) => {
    return Promise.all([
        reservations.map(element => {
            const newReservation = {...element}
            return Reservation.create(newReservation)
            .then(()=>{})
            .catch(error => {console.log(error.message)})
        })
    ])
}

const setLegal = (Legal) => {
    return Promise.all([
        Legal.create({"id" : 1, "text" : "Le présent site est édité par [Nom de la société], société [Type de société] au capital de [Montant] euros, dont le siège social est situé au [Adresse complète], immatriculée au Registre du Commerce et des Sociétés de [Ville] sous le numéro [Numéro d’immatriculation]. Numéro de téléphone : [Numéro de téléphone], Adresse e-mail : [Adresse e-mail]. Le Directeur de la publication est [Nom du Directeur]."}),
        Legal.create({"id" : 2, "text" : "Le site est hébergé par [Nom de l’hébergeur], [Adresse de l’hébergeur], [Ville de l’hébergeur]. Pour contacter cet hébergeur, veuillez vous référer au [Numéro de téléphone de l’hébergeur] ou à l'adresse e-mail [E-mail de l’hébergeur]."}),
        Legal.create({"id" : 3, "text" : "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication."})
    ])
}

const setFestival = (Festival) => {
    return Festival.create(festival[0])
        .then(()=>{})
        .catch(error => {console.log(error.message)}
    )
}

module.exports = { setUser, setRoles, setReservation, setProgramme, setLegal, setHeure, setFestival, setDate }