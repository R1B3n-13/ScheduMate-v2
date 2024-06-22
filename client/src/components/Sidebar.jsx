import { useClassroomContext } from "../contexts/classroomContext";
import { AiOutlineLink } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";

export default function Sidebar() {
  const { classList, focusedClass, setFocusedClass } = useClassroomContext();

  const handleItemClick = (obj) => {
    setFocusedClass(obj);
  };

  return (
    <div className="bg-everforest-bg h-screen w-72 py-6 text-everforest-text overflow-y-auto sticky top-0 z-30">
      <div className="text-xl text-everforest-header mt-20 mb-4 font-bold pl-7">
        Class List :
      </div>
      <motion.ul
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        {classList &&
          classList.map(
            (obj) =>
              obj.class_id && (
                <li
                  key={obj.class_id}
                  onClick={() => handleItemClick(obj)}
                  className={`bg-everforest-sidebar text-sm font-medium flex items-center rounded-e-full py-2 px-2 mb-4 cursor-pointer ${
                    focusedClass === obj
                      ? "focused"
                      : "hover:bg-everforest-select"
                  } transition-all`}
                >
                  <AiOutlineLink className="mr-2" />
                  <p
                    className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                    data-tooltip-content={obj.class_name}
                    data-tooltip-id="className-tooltip"
                  >
                    {obj.class_name}
                  </p>
                  <Tooltip
                    className="overflow-auto"
                    id="className-tooltip"
                    place="bottom"
                    offset="20"
                    positionStrategy="fixed"
                    delayShow="1000"
                  />
                </li>
              )
          )}
      </motion.ul>
      <style jsx="true">
        {`
          .focused {
            background-color: #4d555b;
            color: #ebe5d3;
          }
        `}
      </style>
    </div>
  );
}
