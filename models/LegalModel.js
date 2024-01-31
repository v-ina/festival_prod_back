module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('Legal', {
        text:{ type: DataTypes.TEXT }
    },{timestamps : false})
}