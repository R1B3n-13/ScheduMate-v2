import {
  createRoutineEventDB,
  fetchRoutineEventsDB,
  deleteRoutineEventDB,
} from "../db/routine.db.js";
import { ErrorHandler } from "../middlewares/errorHandler.js";

class RoutineService {
  async create(eventData) {
    const {
      class_id,
      instructor_id,
      event_name,
      event_description,
      event_type,
      event_day,
      event_time,
    } = eventData;

    if (!event_time) {
      throw new ErrorHandler(400, "Time cannot be empty");
    }

    const routineEvents = await createRoutineEventDB(
      class_id,
      instructor_id,
      event_name,
      event_description,
      event_type,
      event_day,
      event_time
    );

    return routineEvents;
  }

  async fetch(classObj) {
    const { class_id } = classObj;

    const routineEvents = await fetchRoutineEventsDB(class_id);

    return routineEvents;
  }

  async delete(eventObj) {
    const { class_id, datetimes, event_day, event_time } = eventObj;

    await deleteRoutineEventDB(class_id, datetimes, event_day, event_time);
  }
}

export default new RoutineService();
