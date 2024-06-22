import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import RoutineTab from "../components/RoutineTab";
import CalenderTab from "../components/CalenderTab";
import EventsTab from "../components/EventsTab";
import { useClassroomContext } from "../contexts/classroomContext";
import MembersTab from "../components/MembersTab";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { focusedClass } = useClassroomContext();

  const tabs = [
    {
      label: "Events",
      content: <EventsTab />,
    },
    {
      label: "Routine",
      content: <RoutineTab />,
    },
    {
      label: "Calender",
      content: <CalenderTab />,
    },
  ];

  if (focusedClass.class_role === "admin") {
    tabs.push({ label: "Members", content: <MembersTab /> });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex"
    >
      <Sidebar />
      <div className="flex-grow justify-center items-center overflow-y-auto mt-12 text-everforest-text">
        <Tabs tabs={tabs} />
      </div>
    </motion.div>
  );
}
