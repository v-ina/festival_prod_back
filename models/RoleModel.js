module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Role',{
        label:{ type: DataTypes.STRING }
    },{timestamps : false})
}