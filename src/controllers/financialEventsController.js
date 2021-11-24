import * as financialEventsService from '../services/financialEventsService.js';

const createFinancialEvent = async (req, res) => {
  const { value, type } = req.body;
  const { user } = res.locals;

  if (!value || !type) {
    return res.sendStatus(400);
  }

  if (!['INCOME', 'OUTCOME'].includes(type)) {
    return res.sendStatus(400);
  }

  if (value < 0) {
    return res.sendStatus(400);
  }

  const financialEvent = await financialEventsService.createFinancialEvent({ userId: user.id, value, type });

  if (financialEvent.length === 0) {
    return res.sendStatus(500);
  }

  res.sendStatus(201);
};

const getFinancialEvents = async (req, res) => {
  const { user } = res.locals;
  const financialEvents = await financialEventsService.getFinancialEvents({ userId: user.id });
  if (financialEvents === null) {
    return res.sendStatus(500);
  }

  return res.send(financialEvents);
};

const getFinancialEventsSum = async (req, res) => {
  const { user } = res.locals;
  const financialEvents = await financialEventsService.getFinancialEvents({ userId: user.id });

  if (financialEvents === null) {
    return res.sendStatus(500);
  }

  const sum = financialEvents.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);

  res.send({ sum });
}

export {
  createFinancialEvent,
  getFinancialEvents,
  getFinancialEventsSum
};