import { useClassroomContext } from "../contexts/classroomContext";

export default function UsersTab() {
  const {
    classIdToUserIdMap,
    userIdToNameMap,
    userIdToEmailMap,
    userIdToRoleMap,
    focusedClass,
  } = useClassroomContext();

  return (
    <div>
      {/* {console.log(userIdToRoleMap)} */}
      <h1 className="text-green-400 text-2xl font-bold mb-3">User list :</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-600">
            <th className="p-2 border border-gray-400">Name</th>
            <th className="p-2 border border-gray-400">Email</th>
            <th className="p-2 border border-gray-400">Action</th>
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
                  : "even:bg-slate-600 odd:bg-gray-600"
              }`}
            >
              <td className="p-2 border border-gray-400">
                {userIdToNameMap.get(user_id)}
              </td>
              <td className="p-2 border border-gray-400">
                {userIdToEmailMap.get(user_id)}
              </td>
              <td className="p-2 border border-gray-400">
                <div className="flex items-center justify-center">
                  <button className="rounded-full border border-gray-400 px-2 py-1 text-sm">
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
      </table>
    </div>
  );
}
