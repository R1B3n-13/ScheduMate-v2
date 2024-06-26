import API from "../api/axios.config";
import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useClassroomContext } from "../contexts/classroomContext";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClassJoinModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [class_id, setClass_Id] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userData } = useUserContext();
  const { setIsClassAdded } = useClassroomContext();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    setClass_Id(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_id = userData.user_id;
    API.post("/classroom/join", { class_id, user_id })
      .then(function () {
        setClass_Id({});
        toast.success("Joined class successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
        });
        closeModal();
        setIsClassAdded(true);
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <div
        className="flex items-center text-everforest-text py-1 px-3 hover:bg-everforest-select transition-all"
        onClick={openModal}
      >
        <MdOutlinePersonAddAlt className="cursor-pointer" />
        <p className="ml-2 cursor-pointer">Join class</p>
      </div>

      {isModalOpen && (
        <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-everforest-bgSoft p-2 rounded-lg shadow-lg w-96">
            <div className="flex">
              <h2 className="text-xl font-semibold text-everforest-header p-3 mb-1">
                Join class
              </h2>
              <div className="flex ml-auto">
                <IoCloseCircle
                  className="text-red-600 hover:text-everforest-red"
                  onClick={closeModal}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-3">
                <label className="block text-everforest-text text-sm mb-2">
                  Class code
                </label>
                <div className="relative mb-4 flex items-center">
                  <input
                    type="text"
                    className="text-sm bg-everforest-select placeholder-gray-500 p-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
                    placeholder="Enter class code"
                    onChange={handleInputChange}
                  />
                </div>
                {errorMessage && (
                  <p className="text-xs text-red-500 mb-3">{errorMessage}</p>
                )}
              </div>
              <button
                type="submit"
                className="mx-auto my-4 rounded-sm px-4 h-9 w-20 flex items-center justify-center bg-everforest-blue text-everforest-text hover:bg-everforest-blueHover focus:outline-none focus:ring focus:ring-everforest-border"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
