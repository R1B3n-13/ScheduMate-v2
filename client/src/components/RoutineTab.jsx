import API from "../api/axios.config";
import dayjs from "dayjs";
import RoutineEventCreationModal from "../components/RoutineEventCreationModal";
import { useState } from "react";
import { useClassroomContext } from "../contexts/classroomContext";
import { useRoutineContext } from "../contexts/routineContext";
import { useCalendarContext } from "../contexts/calendarContext";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function RoutineTab() {
  const { focusedClass, userIdToNameMap } = useClassroomContext();
  const {
    days,
    selectedDay,
    setSelectedDay,
    routineEvents,
    setIsRoutineEventChanged,
  } = useRoutineContext();
  const { setIsCalendarEventChanged, calendarEvents } = useCalendarContext();

  const [formData, setFormData] = useState({
    startingDate: "",
    endingDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const events = [];
  const dates = [];
  const datetimes = [];

  let routine = new Map();

  routineEvents.forEach((event) => {
    const { event_day } = event;
    if (routine.has(event_day)) {
      routine.get(event_day).push(event);
    } else {
      routine.set(event_day, [event]);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { startingDate, endingDate } = formData;

    const start = dayjs(startingDate);
    const end = dayjs(endingDate);
    const diff = end.diff(start, "day");

    if (!startingDate || !endingDate) {
      setErrorMessage("Invalid input. Dates cannot be empty.");
    } else if (end.isBefore(start)) {
      setErrorMessage("Invalid input (end < start).");
    } else if (end.diff(start, "month", true) > 24) {
      setErrorMessage("Limit is 24 months");
    } else {
      setErrorMessage("");

      dates.length = 0;
      events.length = 0;
      for (let i = start.date(); i <= start.date() + diff; i++) {
        const event = routine.get(days[start.date(i).day()]);

        dates.push(start.date(i).format("YYYY-MM-DD"));

        if (event) {
          event.map((item) => {
            const timeStamp =
              start.date(i).format("YYYY-MM-DD ") + item.event_time;

            events.push({
              class_id: item.class_id,
              instructor_id: item.instructor_id,
              event_name: item.event_name,
              event_description: item.event_description,
              event_type: item.event_type,
              event_datetime: timeStamp,
              is_routine: true,
            });
          });
        }
      }

      API.post("/classroom/calendar/createMultiple", {
        class_id: focusedClass.class_id,
        events,
        dates,
      })
        .then(function () {
          setFormData({
            startingDate: "",
            endingDate: "",
          });
          setIsCalendarEventChanged(true);
          toast.success("Events added successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "dark",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            transition: Slide,
          });
        })
        .catch(function (error) {
          setErrorMessage(error.response.data.message);
        });
    }
  };

  const deleteEvent = (day, event_time) => {
    const event_day = days[day];

    datetimes.length = 0;
    calendarEvents.forEach((event) => {
      const { event_datetime } = event;
      const datetime = dayjs(event_datetime);

      if (
        datetime.day() === day &&
        datetime.format("HH:mm:ss") === event_time
      ) {
        datetimes.push(datetime.format("YYYY-MM-DD HH:mm:ss"));
      }
    });

    API.post("/classroom/routine/delete", {
      datetimes,
      class_id: focusedClass.class_id,
      event_day,
      event_time,
    })
      .then(function () {
        toast.success("Event deleted successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
        });
        setIsCalendarEventChanged(true);
        setIsRoutineEventChanged(true);
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div className="flex mx-auto justify-center items-center h-[calc(100vh-16rem)] w-92 scale-110">
        <div className="divide-x-2 divide-everforest-border gap-6 grid grid-cols-2">
          <div className="cursor-pointer">
            {days.map((day, index) => {
              return (
                <div
                  className={`${
                    day === days[selectedDay]
                      ? "bg-everforest-selectFocused"
                      : "hover:bg-everforest-select"
                  } transition-all`}
                >
                  <h1
                    key={index}
                    className="h-[3.4rem] py-3 pl-2 text-xl font-semibold text-everforest-text border-b border-everforest-border"
                    onClick={() => {
                      setSelectedDay(index);
                    }}
                  >
                    {day}
                  </h1>
                </div>
              );
            })}
          </div>
          <div className="w-96 h-96 pl-4 overflow-auto">
            <div className="flex mb-3 font-semibold">
              Schedule for
              <h1 className="ml-2 text-everforest-cyan">{days[selectedDay]}</h1>
            </div>
            {routine.get(days[selectedDay]) &&
              routine.get(days[selectedDay]).map(
                (event, index) =>
                  event.class_id === focusedClass.class_id && (
                    <motion.div
                      key={event.class_id + selectedDay + event.event_time}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, ease: "backOut" }}
                      className="bg-everforest-bgSoft mb-3 text-sm text-everforest-text border border-everforest-border rounded p-3 w-72 shadow-lg whitespace-nowrap"
                    >
                      <div className="flex overflow-x-auto">
                        <ul key={index} className="text-xs">
                          <p className="text-everforest-green font-semibold">
                            Time: {event.event_time}
                          </p>
                          <p>Name: {event.event_name}</p>
                          <p>Description: {event.event_description}</p>
                          <p>Type: {event.event_type}</p>
                          <p>
                            Instructor:{" "}
                            {userIdToNameMap.get(event.instructor_id)}
                          </p>
                        </ul>
                        {focusedClass &&
                          focusedClass.class_role === "admin" && (
                            <RiDeleteBin5Line
                              className="flex fixed top-2 right-2 mt-1  cursor-pointer text-red-500"
                              onClick={() =>
                                deleteEvent(selectedDay, event.event_time)
                              }
                            />
                          )}
                      </div>
                    </motion.div>
                  )
              )}
          </div>
        </div>
      </div>

      <div>
        {focusedClass && focusedClass.class_role === "admin" && (
          <div className="ml-3">
            <form className="w-auto" onSubmit={handleSubmit} noValidate>
              <div className="inline-flex w-2/3 items-center justify-start">
                <label
                  htmlFor="startingDate"
                  className="text-xs font-semibold text-everforest-text mr-2"
                >
                  From:
                </label>
                <input
                  type="date"
                  name="startingDate"
                  className="text-xs bg-everforest-bg py-2 w-28 border-b-2 border-everforest-border focus:outline-none focus:border-everforest-borderFocused mr-5"
                  onChange={handleInputChange}
                  value={formData.startingDate}
                />
                <label
                  htmlFor="endingDate"
                  className="text-xs font-semibold text-everforest-text mr-2"
                >
                  To:
                </label>
                <input
                  type="date"
                  name="endingDate"
                  className="text-xs bg-everforest-bg py-2 w-28 border-b-2 border-everforest-border focus:outline-none focus:border-everforest-borderFocused mr-5"
                  onChange={handleInputChange}
                  value={formData.endingDate}
                />
                <button
                  type="submit"
                  className="w-fit h-fit text-xs flex items-center justify-center bg-everforest-blue text-everforest-text mt-3 py-2 px-4 rounded-sm hover:bg-everforest-blueHover focus:outline-none focus:ring focus:ring-everforest-border"
                >
                  Add to calendar
                </button>
                {errorMessage && (
                  <p className="text-xs pt-3 ml-5 text-red-500">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
            <div>
              <RoutineEventCreationModal />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
