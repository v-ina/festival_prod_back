const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('festival_prod', 'root', '', {
    host : 'localhost',
    dialect : 'mariadb',
    logging : false
})


sequelize.authenticate()

.then(()=>{console.log(`la connextion à la base de donnée a bien été etablié`)})
.catch((error)=>{console.log(`impossible de se connecter à la base de donnée`, error)})


const programmeModel = require('../models/ProgrammeModel')
const userModel = require('../models/UserModel')
const dateModel = require('../models/DateModel')
const heureModel = require('../models/HeureModel')
const reservationModel = require('../models/ReservationModel')
const roleModel = require('../models/RoleModel')

const festivalModel = require('../models/FestivalModel')
const legalModel = require('../models/LegalModel')

const Programme = programmeModel(sequelize, DataTypes)
const User = userModel(sequelize, DataTypes)
const Date = dateModel(sequelize, DataTypes)
const Heure = heureModel(sequelize, DataTypes)
const Reservation = reservationModel(sequelize, DataTypes)
const Role = roleModel(sequelize, DataTypes)
const Festival = festivalModel(sequelize, DataTypes)
const Legal = legalModel(sequelize, DataTypes)


Role.hasMany(User)
User.belongsTo(Role)

Date.hasMany(Programme)
Programme.belongsTo(Date)

Date.belongsToMany(Reservation, {through : 'DateReservations'})
Reservation.belongsToMany(Date, {through : 'DateReservations'})

Heure.hasMany(Programme)
Programme.belongsTo(Heure)



const { setUser, setRoles, setReservation, setProgramme, setLegal, setHeure, setFestival, setDate } = require('./dataSample')

sequelize.sync({force : true})
.then(async()=>{
    await setRoles(Role)
    await setUser(User)
    await setDate(Date)
    await setHeure(Heure)
    await setReservation(Reservation, Date);
    await setProgramme(Programme)

    await setFestival(Festival)
    await setLegal(Legal)
})
.catch((error)=>{console.log(`il y a une erruer`, error.message)})

module.exports =  { sequelize, Programme, User, Date, Heure, Reservation, Role, Festival, Legal }