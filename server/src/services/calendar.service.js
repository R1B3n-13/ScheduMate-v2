import {
  createCalendarEventDB,
  createMultipleCalendarEventsDB,
  deleteMultipleCalendarEventsDB,
  fetchCalendarEventsDB,
} from "../db/calendar.db.js";

class CalendarService {
  async createMultiple(eventData) {
    const { events, dates } = eventData;
    const calendarEvents = await createMultipleCalendarEventsDB(events, dates);
    return calendarEvents;
  }

  async deleteMultiple(eventDate) {
    const { dates } = eventDate;
    await deleteMultipleCalendarEventsDB(dates);
  }

  async create(eventData) {
    const {
      class_id,
      instructor_id,
      event_name,
      event_type,
      event_description,
      event_datetime,
      is_routine,
    } = eventData;

    const calendarEvent = createCalendarEventDB(
      class_id,
      instructor_id,
      event_name,
      event_type,
      event_description,
      event_datetime,
      is_routine
    );

    return calendarEvent;
  }

  async fetch(classObj) {
    const { class_id } = classObj;

    const calendarEvents = await fetchCalendarEventsDB(class_id);

    return calendarEvents;
  }
}

export default new CalendarService();
