import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

const createFinancialEvent = async ({ userId, value, type }) => {
  return await financialEventsRepository.createFinancialEventDB({ userId, value, type });
}

const getFinancialEvents = async ({ userId }) => {
  return await financialEventsRepository.getFinancialEventsDB({ userId });
}

export {
  createFinancialEvent,
  getFinancialEvents
}