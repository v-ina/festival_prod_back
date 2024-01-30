const programmes = require('./mock-programme')
const reservations = require('./mock-reservation')
const legals = require('./mock-legal')
const festivals = require('./mock-festival')


const setProgramme = () => {

}

const setUser = (User) => {
    User.create({"id" : "1" , "email" : "admin@mail.com"})
}

const setRoles = (Role) => {
    Role.create({"id" : "1" , "label" : "admin"})
}

const setDate = (Date) => {
    Date.create({"id" : 1, "date" : "2024-07-05"})
    Date.create({"id" : 2, "date" : "2024-07-06"})
    Date.create({"id" : 3, "date" : "2024-07-07"})
}

const setHeure = (Heure) => {
    Heure.create({"id" : 1, "heure" : "14"})
    Heure.create({"id" : 2, "heure" : "16"})
    Heure.create({"id" : 3, "heure" : "18"})
    Heure.create({"id" : 4, "heure" : "20"})
}

const setReservation = (Reservation) => {

}

const setLegal = (Legal) => {
    
}

const setFestival = (Festival) => {

}