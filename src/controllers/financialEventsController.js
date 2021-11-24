import * as financialEventsService from '../services/financialEventsService.js';

const createFinancialEvent = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getFinancialEvents = async (req, res) => {
  const { user } = res.locals;
  const financialEvents = await financialEventsService.getFinancialEvents({ userId: user.id });
  if (financialEvents === null) {
    return res.sendStatus(500);
  }

  return res.send(financialEvents);
};

export {
  createFinancialEvent,
  getFinancialEvents
};