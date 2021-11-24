import connection from '../database.js'

const createFinancialEventDB = async ({ userId, value, type }) => {
  try {
    const financialEvent = await connection.query(
      `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *;`,
      [userId, value, type]
    );

    return financialEvent.rows;
  } catch (err) {
    return [];
  }
}

const getFinancialEventsDB = async ({ userId }) => {
  try {
    const events = await connection.query(
      `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
      [userId]
    );

    return events.rows;
  } catch (err) {
    return null;
  }
};

export {
  createFinancialEventDB,
  getFinancialEventsDB,
}