import express from "express";
import {
  createClass,
  getClassAndUserList,
} from "../controllers/classroom.controller.js";

const classroomRouter = express.Router();

classroomRouter.post("/classroom/create", createClass);
classroomRouter.post("/classroom/class&UserList", getClassAndUserList);

export default classroomRouter;
