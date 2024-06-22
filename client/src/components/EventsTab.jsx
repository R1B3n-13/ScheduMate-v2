import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useCalendarContext } from "../contexts/calendarContext";
import { useClassroomContext } from "../contexts/classroomContext";
import { useUserContext } from "../contexts/userContext";
import { motion } from "framer-motion";

export default function EventsTab() {
  const { calendarEvents } = useCalendarContext();
  const { userIdToNameMap, focusedClass } = useClassroomContext();
  const { userData } = useUserContext();
  const [contentKey, setContentKey] = useState(0);

  const [selectedOption, setSelectedOption] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [daysFor, setDaysFor] = useState("0");
  const [isChecked, setIsChecked] = useState(false);
  const currentDate = dayjs();
  const endDate = currentDate.add(daysFor, "day").endOf("day");
  const renderedEvents = [];

  useEffect(() => {
    setContentKey((prevKey) => prevKey + 1);
  }, [isChecked, daysFor, selectedOption]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  let dateStr = "";
  for (let index = 1; index < calendarEvents.length; index++) {
    const event = calendarEvents[index];
    const eventDate = dayjs(event.event_datetime);

    if (eventDate.isAfter(endDate)) {
      break;
    }

    if (eventDate.isBefore(currentDate)) {
      continue;
    }

    if (
      daysFor === "1" &&
      currentDate.toDate().toDateString() === eventDate.toDate().toDateString()
    ) {
      continue;
    }

    if (
      (selectedOption === "all" || selectedOption === event.event_type) &&
      focusedClass.class_id === event.class_id &&
      (!isChecked || userData.user_id === event.instructor_id)
    ) {
      if (dateStr !== eventDate.toDate().toDateString()) {
        renderedEvents.push(
          <>
            <div className="w-screen border-b border-everforest-border mt-5 flex">
              <p className="mr-2 font-semibold text-everforest-red">Date:</p>
              <p className="text-everforest-header">
                {eventDate.format("YYYY-MM-DD")}
              </p>
            </div>
          </>
        );
        dateStr = eventDate.toDate().toDateString();
      }
      renderedEvents.push(
        <motion.div
          key={contentKey + event.class_id + event.event_datetime}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="bg-everforest-bgSoft text-sm text-everforest-text border border-everforest-border rounded p-4 w-72 shadow-lg whitespace-nowrap"
        >
          <div className="overflow-x-auto">
            <p className="text-everforest-green font-semibold">
              Time: {eventDate.format("HH:mm:ss")}
            </p>
            <p>Name: {event.event_name}</p>
            <p>Description: {event.event_description}</p>
            <p>Type: {event.event_type}</p>
            <p>Instructor: {userIdToNameMap.get(event.instructor_id)}</p>
          </div>
        </motion.div>
      );
    }
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDaysChange = (e) => {
    setDaysFor(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div className="flex mb-8">
        <label className="flex items-center justify-center cursor-pointer ml-4">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 accent-everforest-select"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2 text-everforest-text text-sm">
            Show only the ones you teach
          </span>
        </label>
        {focusedClass.class_id && (
          <div className="flex rounded-full border bg-everforest-bgSoft border-everforest-border shadow-lg px-2 ml-auto justify-center items-center text-sm text-everforest-text font-semibold hover:scale-105 transition-all">
            {expanded && (
              <motion.p
                key={focusedClass.class_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="ml-1 text-sm text-everforest-orange font-normal"
                onClick={toggleExpand}
              >
                {focusedClass.class_id}
              </motion.p>
            )}
            <motion.div
              key={expanded}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <button
                onClick={toggleExpand}
                className="ml-1 text-sm text-everforest-text font-normal focus:outline-none"
              >
                {expanded ? "" : "Click to show class code"}
              </button>
            </motion.div>
          </div>
        )}
        <select
          className="ml-auto text-sm bg-everforest-bg p-2 w-28 text-everforest-text focus:outline-none border-b-2 border-everforest-border focus:border-everforest-borderFocused mr-5"
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
          className="text-sm bg-everforest-bg p-2 w-28 text-everforest-text focus:outline-none border-b-2 border-everforest-border focus:border-everforest-borderFocused mr-3"
          value={daysFor}
          onChange={handleDaysChange}
        >
          <option value={0}>Today</option>
          <option value={1}>Tomorrow</option>
          <option value={3}>3 days</option>
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-5 w-[81vw]">{renderedEvents}</div>
    </motion.div>
  );
}
