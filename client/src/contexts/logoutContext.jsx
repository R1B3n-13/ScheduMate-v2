import API from "../api/axios.config";
import { createContext, useContext } from "react";
import { useAuthContext } from "./authContext";
import { useUserContext } from "./userContext";
import { useCalendarContext } from "./calendarContext";
import { useClassroomContext } from "./classroomContext";
import { useRoutineContext } from "./routineContext";
import dayjs from "dayjs";

const LogoutContext = createContext();

const LogoutContextProvider = ({ children }) => {
  const { setIsLoggedIn } = useAuthContext();
  const { setUserData } = useUserContext();
  const { setCalendarEvents, setSelectedDate } = useCalendarContext();
  const { setClassList, setFocusedClass } = useClassroomContext();
  const { setRoutineEvents, setSelectedDay } = useRoutineContext();

  const logout = () => {
    API.get("/logout").then(() => {
      setUserData(null);
      setIsLoggedIn(false);
      setCalendarEvents([]);
      setSelectedDate(dayjs());
      setClassList([]);
      setFocusedClass([]);
      setRoutineEvents([]);
      setSelectedDay(0);
    });
  };

  return (
    <LogoutContext.Provider value={{ logout }}>
      {children}
    </LogoutContext.Provider>
  );
};

const useLogoutContext = () => {
  const context = useContext(LogoutContext);

  if (context === undefined) {
    throw new Error(
      "useLogoutContext must be used within LogoutContextProvider"
    );
  }
  return context;
};

export { LogoutContextProvider, useLogoutContext };
