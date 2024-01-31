module.exports=(sequlize, DataTypes)=>{
    return sequlize.define('Programme', {
        artist:{ type: DataTypes.STRING },
        photo:{ type: DataTypes.JSON },
        description:{ type: DataTypes.TEXT },
        reseaux:{ type: DataTypes.JSON }
    },{timestamps : false})
}