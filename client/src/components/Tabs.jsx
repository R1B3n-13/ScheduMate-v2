import { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex items-center mt-5 mx-6 justify-center border-b border-gray-800">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === index
                ? "bg-gray-700 text-slate-200"
                : "text-slate-300 hover:bg-gray-800"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="my-4 mx-6">{tabs[activeTab].content}</div>
    </div>
  );
}
