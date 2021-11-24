import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

const createFinancialEvent = async ({ id, value, type }) => {
  return await financialEventsRepository.createFinancialEventDB({ id, value, type });
}

export {
  createFinancialEvent
}