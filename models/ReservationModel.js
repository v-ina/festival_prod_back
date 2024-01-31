module.exports=(sequlize, DataTypes)=>{
    return sequlize.define('Reservation', {
        nom:{ type: DataTypes.STRING },
        prenom:{ type: DataTypes.STRING },
        email:{ type: DataTypes.STRING }
    },{updatedAt : false})
}