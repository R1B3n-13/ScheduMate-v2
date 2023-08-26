import dayjs from "dayjs";
import { useState } from "react";
import { useCalendarContext } from "../contexts/calendarContext";
import { useClassroomContext } from "../contexts/classroomContext";
import { useUserContext } from "../contexts/userContext";

export default function EventsTab() {
  const { calendarEvents } = useCalendarContext();
  const { userIdToNameMap, focusedClass } = useClassroomContext();
  const { userData } = useUserContext();
  const [selectedOption, setSelectedOption] = useState("all");
  const [daysFor, setDaysFor] = useState(3);
  const [isChecked, setIsChecked] = useState(false);
  const currentDate = dayjs();
  const endDate = currentDate.add(daysFor, "day");
  const renderedEvents = [];

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  for (let index = 1; index < calendarEvents.length; index++) {
    const event = calendarEvents[index];
    const eventDate = dayjs(event.event_datetime);

    if (eventDate.isAfter(endDate)) {
      break;
    }

    if (
      (selectedOption === "all" || selectedOption === event.event_type) &&
      focusedClass.class_id === event.class_id &&
      (!isChecked || userData.user_id === event.instructor_id)
    )
      renderedEvents.push(
        <div
          key={index}
          className="bg-gray-800 text-sm text-slate-300 border border-slate-600 rounded p-4 w-72 shadow-lg whitespace-nowrap"
        >
          <div className="overflow-x-scroll">
            <p className="text-red-500 font-semibold">
              Date: {eventDate.format("YYYY-MM-DD")}
            </p>
            <p className="text-green-400">
              Time: {eventDate.format("HH:mm:ss")}
            </p>
            <p>Name: {event.event_name}</p>
            <p>Description: {event.event_description}</p>
            <p>Instructor: {userIdToNameMap.get(event.instructor_id)}</p>
          </div>
        </div>
      );
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDaysChange = (e) => {
    setDaysFor(e.target.value);
  };

  return (
    <div>
      <div className="flex mb-8">
        <label className="flex items-center cursor-pointer ml-4">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 accent-gray-700"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2 text-slate-300">
            Show only the classes you teach
          </span>
        </label>
        <select
          className="ml-auto text-sm bg-bgcolor p-2 w-28 focus:outline-none border-b-2 border-slate-600 focus:border-slate-400 mr-5"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="all">All</option>
          <option value="class">Classes</option>
          <option value="exam">Exams</option>
          <option value="assignment">Assignments</option>
          <option value="other">Others</option>
        </select>

        <select
          className="text-sm bg-bgcolor p-2 w-28 focus:outline-none border-b-2 border-slate-600 focus:border-slate-400 mr-3"
          value={daysFor}
          onChange={handleDaysChange}
        >
          <option value={3}>3 days</option>
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-5 w-[79vw]">
        {renderedEvents}
      </div>
    </div>
  );
}
