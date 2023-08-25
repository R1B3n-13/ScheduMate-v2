import express from "express";
import {
  createClass,
  getClassAndUserList,
  joinClass,
} from "../controllers/classroom.controller.js";

const classroomRouter = express.Router();

classroomRouter.post("/classroom/create", createClass);
classroomRouter.post("/classroom/class&UserList", getClassAndUserList);
classroomRouter.post("/classroom/join", joinClass);

export default classroomRouter;
