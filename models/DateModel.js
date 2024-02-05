

module.exports = (sequelize, DataTypes) => {
    const Date = sequelize.define('Date', {
        date:{ type: DataTypes.DATE }
    },{timestamps : false})

    Date.associate = function(models) {
        Date.belongsToMany(models.Reservation, { through: 'datereservations', foreignKey: 'DateId', otherKey: 'ReservationId' });
    };
    
    return Date;
}