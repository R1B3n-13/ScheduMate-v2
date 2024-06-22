import { CgMoreO } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  FaQuestionCircle,
  FaInfoCircle,
  FaBlog,
  FaUserTie,
  FaAddressCard,
} from "react-icons/fa";

export default function NavbarDropdown() {
  return (
    <div className="relative group">
      <div className="flex cursor-pointer text-everforest-text items-center justify-center hover:scale-105 transition-all">
        <CgMoreO className="mr-2" />
        <p>More</p>
        <IoMdArrowDropdown className="text-gray-500 mt-1 ml-1" />
      </div>

      <div className="invisible mt-2 group-hover:visible absolute left-0 w-48 bg-everforest-bgSoft border border-everforest-border rounded-lg shadow-lg transition-all">
        <ul className="p-1 text-base text-everforest-text">
          <li className="cursor-pointer hover:bg-everforest-select transition-all">
            <div className="flex items-center py-1 px-3">
              <FaInfoCircle className="mr-2" />
              About
            </div>
          </li>
          <li className="cursor-pointer hover:bg-everforest-select transition-all">
            <div className="flex items-center py-1 px-3">
              <FaBlog className="mr-2" />
              Blog
            </div>
          </li>
          <li className="cursor-pointer hover:bg-everforest-select transition-all">
            <div className="flex items-center py-1 px-3">
              <FaQuestionCircle className="mr-2" />
              FAQ
            </div>
          </li>
          <li className="cursor-pointer hover:bg-everforest-select transition-all">
            <div className="flex items-center py-1 px-3">
              <FaUserTie className="mr-2" />
              Staff
            </div>
          </li>
          <li className="cursor-pointer hover:bg-everforest-select transition-all">
            <div className="flex items-center py-1 px-3">
              <FaAddressCard className="mr-2" />
              Contact
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
