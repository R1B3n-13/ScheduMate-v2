import API from "../api/axios.config";
import { useClassroomContext } from "../contexts/classroomContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function MembersTab() {
  const {
    classIdToUserIdMap,
    userIdToNameMap,
    userIdToEmailMap,
    userIdToRoleMap,
    focusedClass,
    setIsRoleChanged,
  } = useClassroomContext();

  const handleClick = (class_id, user_id, class_role) => {
    console.log(class_id, user_id, class_role);
    API.post("/classroom/change-role", { class_id, user_id, class_role })
      .then(function () {
        toast.success("Action applied successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
        });
        setIsRoleChanged(true);
      })
      .catch(function () {
        toast.error("An error occurred", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <h1 className="text-everforest-header text-xl font-bold mb-3">
        Member list :
      </h1>
      <motion.table
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="w-full border-collapse shadow-lg"
      >
        <thead>
          <tr className="bg-everforest-bg">
            <th className="p-2 border border-everforest-border">Name</th>
            <th className="p-2 border border-everforest-border">Email</th>
            <th className="p-2 border border-everforest-border">Action</th>
          </tr>
        </thead>
        <tbody>
          {classIdToUserIdMap.get(focusedClass.class_id).map((user_id) => (
            <tr
              key={user_id}
              className={`${
                userIdToRoleMap.get(
                  JSON.stringify({
                    class_id: focusedClass.class_id,
                    user_id: user_id,
                  })
                ) === "admin"
                  ? "hidden"
                  : "even:bg-everforest-bgSoft odd:bg-everforest-bg"
              }`}
            >
              <td className="p-2 border border-everforest-border">
                {userIdToNameMap.get(user_id)}
              </td>
              <td className="p-2 border border-everforest-border">
                {userIdToEmailMap.get(user_id)}
              </td>
              <td className="p-2 border border-everforest-border">
                <div className="flex items-center justify-center">
                  <button
                    className="rounded-full border border-everforest-border bg-everforest-bgSoft drop-shadow-lg hover:bg-everforest-select transition-all px-2 py-1 text-sm"
                    onClick={() => {
                      let class_role;

                      userIdToRoleMap.get(
                        JSON.stringify({
                          class_id: focusedClass.class_id,
                          user_id: user_id,
                        })
                      ) === "user"
                        ? (class_role = "moderator")
                        : (class_role = "user");

                      handleClick(focusedClass.class_id, user_id, class_role);
                    }}
                  >
                    {userIdToRoleMap.get(
                      JSON.stringify({
                        class_id: focusedClass.class_id,
                        user_id: user_id,
                      })
                    ) === "user"
                      ? "Make moderator"
                      : "Remove moderator"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
