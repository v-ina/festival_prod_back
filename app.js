const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 4000
const cors = require('cors')
const { sequelize } = require('./db/sequelizeSetup')

const db = sequelize.sequelize

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const DateRouter = require('./routes/DateRoutes')

const FestivalRouter = require('./routes/FestivalRoutes')
const HeureRouter = require('./routes/HeureRoutes')
const LegalRouter = require('./routes/LegalRoutes')
const ProgrammeRouter = require('./routes/ProgrammeRoutes')
const ReservationRouter = require('./routes/ReservationRoutes')
const UserRouter = require('./routes/UserRoutes')

const DateReservationRouter = require('./routes/DateReservationsRoute')


app.use('/api/dates' , DateRouter)
app.use('/api/festival', FestivalRouter)
app.use('/api/heures', HeureRouter)
app.use('/api/legals' , LegalRouter)
app.use('/api/programmes', ProgrammeRouter)
app.use('/api/reservations', ReservationRouter)
app.use('/api/users', UserRouter)


app.listen(port, ()=>{
    console.log(`back is running on ${port} =)`);
})