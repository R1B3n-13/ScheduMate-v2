import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutContext } from "../contexts/logoutContext";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function UserDropdown({ userName }) {
  const { logout } = useLogoutContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleBlur = () => {
    const id = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
    setTimerId(id);
  };

  const handleFocus = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  return (
    <div className="relative">
      <div
        className={`rounded-full w-10 h-10 bg-emerald-600 flex items-center justify-center drop-shadow-md text-white cursor-pointer hover:bg-emerald-700 ${
          isDropdownOpen ? "focus:ring focus:ring-everforest-border" : ""
        }`}
        onClick={toggleDropdown}
        tabIndex="0"
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        {userName && userName[0]}
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-everforest-bgSoft border border-everforest-border rounded-lg shadow-lg">
          <ul className="p-1 text-base text-everforest-text">
            <li className="cursor-default text-center mb-2 py-2 text-everforest-green border-b border-everforest-border">
              {userName && userName}
            </li>
            <li className="cursor-pointer flex items-center hover:bg-everforest-select transition-all">
              <div className="flex items-center py-1 px-3">
                <FiUser className="mr-2" />
                Profile
              </div>
            </li>
            <li className="cursor-pointer flex items-center hover:bg-everforest-select transition-all">
              <div className="flex items-center py-1 px-3">
                <FiSettings className="mr-2" />
                Settings
              </div>
            </li>
            <li
              className="cursor-pointer flex items-center hover:bg-everforest-select transition-all"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <div className="flex items-center py-1 px-3">
                <FiLogOut className="mr-2" />
                Logout
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
