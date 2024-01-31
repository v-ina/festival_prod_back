module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Date', {
        date:{ type: DataTypes.DATE }
    },{timestamps : false})
}