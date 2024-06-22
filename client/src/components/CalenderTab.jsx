import API from "../api/axios.config";
import dayjs from "dayjs";
import CalendarEventCreationModal from "../components/CalendarEventCreationModal";
import { useState } from "react";
import { useCalendarContext } from "../contexts/calendarContext";
import { useClassroomContext } from "../contexts/classroomContext";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function CalenderTab() {
  const currentDate = dayjs();
  const {
    calendarEvents,
    selectedDate,
    setSelectedDate,
    setIsCalendarEventChanged,
  } = useCalendarContext();

  const { focusedClass, userIdToNameMap } = useClassroomContext();
  const [today, setToday] = useState(currentDate);
  const [formData, setFormData] = useState({
    startingDate: "",
    endingDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dates = [];

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let calendar = new Map();

  calendarEvents.forEach((event) => {
    const { event_datetime } = event;
    const event_date = dayjs(event_datetime).toDate().toDateString();
    if (calendar.has(event_date)) {
      calendar.get(event_date).push(event);
    } else {
      calendar.set(event_date, [event]);
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
      for (let i = start.date(); i <= start.date() + diff; i++) {
        dates.push(start.date(i).format("YYYY-MM-DD"));
      }

      API.post("/classroom/calendar/deleteMultiple", {
        class_id: focusedClass.class_id,
        dates,
      })
        .then(function () {
          setFormData({
            startingDate: "",
            endingDate: "",
          });
          setIsCalendarEventChanged(true);
          toast.success("Events deleted successfully", {
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

  const deleteEvent = (event_datetime) => {
    API.post("/classroom/calendar/delete", {
      class_id: focusedClass.class_id,
      event_datetime,
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
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
      });
  };

  const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // Generate prefix dates
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      arrayOfDate.push({
        isCurrentMonth: false,
        date: firstDateOfMonth.day(i),
        isToday: false,
      });
    }

    // Generate current dates
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({
        isCurrentMonth: true,
        date: firstDateOfMonth.date(i),
        isToday:
          firstDateOfMonth.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
    }

    const remainingDays = 42 - arrayOfDate.length;

    // Generate suffix dates
    for (
      let i = lastDateOfMonth.date() + 1;
      i <= lastDateOfMonth.date() + remainingDays;
      i++
    ) {
      arrayOfDate.push({
        isCurrentMonth: false,
        date: lastDateOfMonth.date(i),
        isToday: false,
      });
    }
    return arrayOfDate;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div className="flex mx-auto divide-x-2 divide-everforest-border gap-6 h-[calc(100vh-16rem)] items-center justify-center scale-110">
        <div className="w-96 h-96">
          <div className="flex justify-between items-center">
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-10 items-center ">
              <MdNavigateBefore
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className="text-everforest-red cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                Today
              </h1>
              <MdNavigateNext
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-7 content-center">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="h-[3.4rem] grid place-content-center text-sm text-everforest-text"
                >
                  {day}
                </h1>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ isCurrentMonth, date, isToday }, index) => {
                return (
                  <div
                    key={index}
                    className="h-[3.4rem] border-t border-everforest-border grid place-content-center text-sm"
                  >
                    <h1
                      className={`${
                        isCurrentMonth
                          ? "text-everforest-text"
                          : "text-everforest-textDisabled"
                      } ${
                        isToday
                          ? "bg-everforest-pink text-everforest-text hover:bg-everforest-pinkHover"
                          : "hover:bg-everforest-select"
                      } ${
                        selectedDate.toDate().toDateString() ===
                          date.toDate().toDateString() && !isToday
                          ? "bg-everforest-selectFocused"
                          : ""
                      } h-10 w-10 grid place-content-center rounded-full transition-all cursor-pointer`}
                      onClick={() => {
                        setSelectedDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="h-96 w-96 pl-4 overflow-auto">
          <h1 className="flex mb-3 font-semibold">
            Schedule for
            <p className="text-everforest-cyan ml-2">
              {selectedDate.toDate().toDateString()}
            </p>
          </h1>
          {calendar.get(selectedDate.toDate().toDateString()) &&
            calendar.get(selectedDate.toDate().toDateString()).map(
              (event, index) =>
                event.class_id === focusedClass.class_id && (
                  <motion.div
                    key={event.class_id + event.event_datetime}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                    className="bg-everforest-bgSoft mb-3 text-sm text-everforest-text border border-everforest-border rounded p-3 w-72 shadow-lg whitespace-nowrap"
                  >
                    <div className="flex overflow-x-auto">
                      <ul key={index} className="text-xs">
                        <p className="text-everforest-green font-semibold">
                          Time: {dayjs(event.event_datetime).format("HH:mm:ss")}
                        </p>
                        <p>Name: {event.event_name}</p>
                        <p>Description: {event.event_description}</p>
                        <p>Type: {event.event_type}</p>
                        <p>
                          Instructor: {userIdToNameMap.get(event.instructor_id)}
                        </p>
                      </ul>
                      {focusedClass &&
                        (focusedClass.class_role === "admin" ||
                          focusedClass.class_role === "moderator" ||
                          (event.instructor_id &&
                            event.instructor_id === focusedClass.user_id)) && (
                          <RiDeleteBin5Line
                            className="flex fixed top-2 right-2 ml-auto mt-1 cursor-pointer text-red-500"
                            onClick={() =>
                              deleteEvent(
                                dayjs(event.event_datetime).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                              )
                            }
                          />
                        )}
                    </div>
                  </motion.div>
                )
            )}
        </div>
      </div>

      <div>
        {focusedClass &&
          (focusedClass.class_role === "admin" ||
            focusedClass.class_role === "moderator") && (
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
                    className="text-xs font-semibold text-slate-300 mr-2"
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
                    Delete from calendar
                  </button>
                  {errorMessage && (
                    <p className="text-xs pt-3 ml-5 text-red-500">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
              <div>
                <CalendarEventCreationModal />
              </div>
            </div>
          )}
      </div>
    </motion.div>
  );
}
