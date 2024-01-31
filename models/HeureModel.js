module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('Heure',{
        heure:{ type: DataTypes.INTEGER }
    },{timestamps : false})
}