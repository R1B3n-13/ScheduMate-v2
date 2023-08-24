import express from "express";
import {
  createRoutineEvent,
  fetchRoutineEvents,
} from "../controllers/routine.controller.js";

const routineRouter = express.Router();

routineRouter.post("/classroom/routine/create", createRoutineEvent);
routineRouter.post("/classroom/routine/fetch", fetchRoutineEvents);

export default routineRouter;
