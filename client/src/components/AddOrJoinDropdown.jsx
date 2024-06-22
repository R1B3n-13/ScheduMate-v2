import { useState } from "react";
import { TfiPlus } from "react-icons/tfi";
import ClassCreationModal from "./ClassCreationModal";
import ClassJoinModal from "./ClassJoinModal";

export default function AddOrJoinDropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <TfiPlus
        className="cursor-pointer text-everforest-text hover:scale-110 transition-all"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-everforest-bgSoft border border-everforest-border rounded-lg shadow-lg">
          <ul className="p-1 text-base text-everforest-text">
            <ClassCreationModal />
            <ClassJoinModal />
          </ul>
        </div>
      )}
    </div>
  );
}
