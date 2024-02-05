const { sequelize, Date, Reservation, DateReservations } = require('../db/sequelizeSetup');

const createReservationWithDates = async (reservationData, dateIds) => {
  const transaction = await sequelize.transaction();

  try {
    // Reservation 생성
    const reservation = await Reservation.create(reservationData, { transaction });

    // 각 DateId에 대해 DateReservations 연결 테이블에 새로운 행을 삽입
    for (let dateId of dateIds) {
      await DateReservations.create({
        DateId: dateId,
        ReservationId: reservation.id
      }, { transaction });
    }

    await transaction.commit();
    return reservation;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  createReservationWithDates
};