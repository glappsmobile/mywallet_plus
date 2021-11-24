import connection from '../database.js'

const createFinancialEventDB = async ({ id, value, type }) => {
  try {
    const financialEvent = await connection.query(
      `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *;`,
      [id, value, type]
    );

    return financialEvent.rows;
  } catch (err) {
    return [];
  }
}

export {
  createFinancialEventDB
}