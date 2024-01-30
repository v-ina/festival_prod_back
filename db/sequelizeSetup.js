const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('festival_prod', 'root', '', {
    host : 'localhost',
    dialect : 'mariadb',
    logging : false
})


sequelize.authenticate()

.then(()=>{console.log(`la connextion à la base de donnée a bien été etablié`)})
.catch((error)=>{console.log(`impossible de se connecter à la base de donnée`, error)})


const programmeModel = require('../models/programmeModel')
const userModel = require('../models/userModel')
const dateModel = require('../models/dateModel')
const heureModel = require('../models/heureModel')
const reservationModel = require('../models/reservationModel')
const roleModel = require('../models/roleModel')

const festivalModel = require('../models/festivalModel')
const legalModel = require('../models/legalModel')

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

Date.hasMany(Reservation)
Reservation.belongsTo(Date)

Heure.hasMany(Programme)
Programme.belongsTo(Heure)



const { setCategories, setUsers, setRoles} = require('./dataSample')

sequelize.sync({force : false})
.then(()=>{
    // setRoles(Role)
    // setUsers(User)
    // setCategories(Category)
})
.catch(()=>{console.log(`il y a une erruer`)})

module.exports =  { sequelize, Programme, User, Date, Heure, Reservation, Role, Festival, Legal }