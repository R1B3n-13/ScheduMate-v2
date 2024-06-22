import { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex items-center mt-14 mx-6 justify-center font-medium">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 focus:outline-none drop-shadow-md bg-everforest-bgSoft ${
              activeTab === index
                ? "bg-everforest-selectFocused text-everforest-text"
                : "text-everforest-text hover:bg-everforest-select"
            } transition`}
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
