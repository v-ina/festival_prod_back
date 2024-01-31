module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('User',{
        email : { type: DataTypes.STRING },
        password : { type : DataTypes.STRING }
    },{timestamps : false})
}