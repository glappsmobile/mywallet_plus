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

    const financialEvent = await financialEventsService.createFinancialEvent({ id: user.id, value, type });

    if (financialEvent.length === 0) {
      return res.sendStatus(500);
    }

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export {
  createFinancialEvent
};