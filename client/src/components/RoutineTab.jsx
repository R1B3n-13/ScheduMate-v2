import API from "../api/axios.config";
import dayjs from "dayjs";
import RoutineEventCreationModal from "../components/RoutineEventCreationModal";
import { useClassroomContext } from "../contexts/classroomContext";
import { useRoutineContext } from "../contexts/routineContext";
import { useCalendarContext } from "../contexts/calendarContext";
import { useState } from "react";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RoutineTab() {
  const { focusedClass, userIdToNameMap } = useClassroomContext();
  const { days, selectedDay, setSelectedDay, routineEvents } =
    useRoutineContext();
  const { setIsEventAdded } = useCalendarContext();
  const [formData, setFormData] = useState({
    startingDate: "",
    endingDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const events = [];
  const dates = [];

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
              event_datetime: timeStamp,
              is_routine: true,
            });
          });
        }
      }

      API.post("/classroom/calendar/createMultiple", { events, dates })
        .then(function () {
          setFormData({
            startingDate: "",
            endingDate: "",
          });
          setIsEventAdded(true);
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

  return (
    <>
      <div className="flex mx-auto justify-center items-center h-[72vh] w-92 scale-110">
        <div className="divide-x-2 divide-gray-800 gap-6 grid grid-cols-2">
          <div className="cursor-pointer">
            {days.map((day, index) => {
              return (
                <div
                  className={`${
                    day === days[selectedDay]
                      ? "bg-slate-700"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <h1
                    key={index}
                    className="h-[3.4rem] py-3 pl-2 text-xl font-semibold text-slate-200 border-b border-gray-800"
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
          <div className="w-96 h-96 pl-3 overflow-auto">
            <div className="flex font-semibold border-b border-gray-700">
              Schedule for
              <h1 className="ml-2 text-cyan-300">{days[selectedDay]}</h1>
            </div>
            {routine.get(days[selectedDay]) &&
              routine.get(days[selectedDay]).map(
                (event, index) =>
                  event.class_id === focusedClass.class_id && (
                    <li key={index} className="text-xs mt-2">
                      <p className="text-red-500">Time: {event.event_time}</p>
                      <p>Name: {event.event_name}</p>
                      <p>Description: {event.event_description}</p>
                      <p>Type: {event.event_type}</p>
                      <p>
                        Instructor: {userIdToNameMap.get(event.instructor_id)}
                      </p>
                    </li>
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
                  className="text-xs font-semibold text-slate-300 mr-2"
                >
                  From:
                </label>
                <input
                  type="date"
                  name="startingDate"
                  className="text-xs bg-bgcolor py-2 w-28 border-b-2 border-slate-600 focus:outline-none focus:border-slate-400 mr-5"
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
                  className="text-xs bg-bgcolor py-2 w-28 border-b-2 border-slate-600 focus:outline-none focus:border-slate-400 mr-5"
                  onChange={handleInputChange}
                  value={formData.endingDate}
                />
                <button
                  type="submit"
                  className="w-fit h-fit text-xs flex items-center justify-center bg-blue-900 text-white mt-3 py-2 px-4 rounded-sm hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
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
    </>
  );
}
