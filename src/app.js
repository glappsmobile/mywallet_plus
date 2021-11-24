import express from "express";
import cors from "cors";
import auth from './middlewares/auth.js';
import * as userController from "./controllers/userController.js";
import * as financialEventsController from "./controllers/financialEventsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", auth, financialEventsController.createFinancialEvent);

app.get("/financial-events", auth, financialEventsController.getFinancialEvents);

app.get("/financial-events/sum", auth, financialEventsController.getFinancialEventsSum);

export default app;
