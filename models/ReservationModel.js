module.exports=(sequlize, DataTypes)=>{
    const Reservation = sequlize.define('Reservation', {
        nom:{ type: DataTypes.STRING },
        prenom:{ type: DataTypes.STRING },
        email:{ type: DataTypes.STRING }
    },{updatedAt : false})

    Reservation.associate = function(models) {
        Reservation.belongsToMany(models.Date, { through: 'datereservations', foreignKey: 'ReservationId', otherKey: 'DateId' });
      };
    
      return Reservation;
}