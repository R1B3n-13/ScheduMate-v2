import pool from "../configs/pool.js";
import { ErrorHandler } from "../middlewares/errorHandler.js";

const createRoutineEventDB = async (
  class_id,
  instructor_id,
  event_name,
  event_description,
  event_type,
  event_day,
  event_time
) => {
  try {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const { rows: routineEvents } = await client.query(
        "INSERT INTO routine_events VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          class_id,
          instructor_id,
          event_name,
          event_description,
          event_type,
          event_day,
          event_time,
        ]
      );

      await client.query(
        "UPDATE class_users SET is_instructor = $1 WHERE user_id = $2 and class_id = $3",
        [true, instructor_id, class_id]
      );

      await client.query("COMMIT");

      return routineEvents;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    if (error.routine === "DateTimeParseError") {
      throw new ErrorHandler(400, "Invalid time format");
    }
    if (error.constraint === "routine_events_pkey") {
      throw new ErrorHandler(409, "Event already exists");
    }
    throw new ErrorHandler(500, "An error occurred");
  }
};

const fetchRoutineEventsDB = async (class_id) => {
  try {
    const { rows: routineEvents } = await pool.query(
      "SELECT * FROM routine_events WHERE class_id = $1 ORDER BY event_time",
      [class_id]
    );
    return routineEvents;
  } catch (error) {
    throw new ErrorHandler(500, "An error occurred");
  }
};

export { createRoutineEventDB, fetchRoutineEventsDB };