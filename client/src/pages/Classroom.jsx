import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import RoutineTab from "../components/RoutineTab";
import CalenderTab from "../components/CalenderTab";

export default function Dashboard() {
  const tabs = [
    {
      label: "Events",
      content: <p>This is the content of Tab 1.</p>,
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow justify-center items-center overflow-y-auto mt-12 text-slate-200">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}