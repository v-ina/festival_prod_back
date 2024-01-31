const { Programme, User, Date, Heure, Reservation, Role, Festival, Legal } = require('../db/sequelizeSetup')
const SECRET_KEY = require('../configs/tokenData')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = (req, res) =>{
    User.findOne({where : {email : req.body.email}})
    .then((afterFindOne)=>{
        if(!afterFindOne){
            return res.json({message : `on peut pas trouver nom d'utilisateur ${req.body.email}`})
        }
        bcrypt.compare(req.body.password, afterFindOne.password)
        .then((isValid)=>{
            if(!isValid){
                return res.json({message : `mot de passe n'est pas correct`})
            }
            const token = jwt.sign( {data : {email : afterFindOne.email, role : afterFindOne.RoleId}}, SECRET_KEY, {expiresIn : '24h'} )
            res.json({message : `login reussi. bonjour ${afterFindOne.email}`, token : token })
        })
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}

const protect = (req, res, next) =>{
    if(!req.headers.authorization){
        return res.json({message : `il faut avoir l'accès pour cette service`})
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token){
        try{
            const decoded = jwt.verify(token, SECRET_KEY)
            req.email = decoded.data.email
            next()
        } catch {
            return res.json({message : `token n'est pas valid`})
        }
    }
}

const restrict = (req, res, next) => {
    User.findOne({ where: { email: req.email } })
    .then(user => {
        console.log(user);
        return Role.findByPk(user.RoleId)
        .then(role => {
            if (role.id === 1) {
                console.log('admin 리스트릭트 성공');
                next()
                
            } else {
                res.status(403).json({ message: `seulement administarateur a l'acces pour cette service`})
            }
        })
    })
    .catch((error)=>{ res.status(500).json({message : `il y a une erreur`, error : error.message})})
}



module.exports = { login, protect, restrict }