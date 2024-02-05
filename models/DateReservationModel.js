
module.exports = (sequelize, DataTypes) => {
    const DateReservations = sequelize.define('datereservations', {
      DateId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'dates',
          key: 'id'
        }
      },
      ReservationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'reservations',
          key: 'id'
        }
      }
    }, {
      timestamps: false
    });
  
    return DateReservations;
  };