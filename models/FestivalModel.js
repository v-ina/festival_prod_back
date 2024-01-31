module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Festival', {
        information:{ type: DataTypes.TEXT },
        images:{ type: DataTypes.JSON },
        info_pratique:{ type: DataTypes.JSON },
        faq:{ type:DataTypes.JSON }
    },{timestamps : false})
}