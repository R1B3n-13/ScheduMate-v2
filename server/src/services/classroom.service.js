import { createClassDB, getClassAndUserListDB } from "../db/classroom.db.js";
import { ErrorHandler } from "../middlewares/errorHandler.js";

class ClassroomService {
  async create(classData) {
    const { class_name, user_id } = classData;

    if (!class_name) {
      throw new ErrorHandler(400, "Class name cannot be empty");
    }
    if (user_id === null) {
      throw new ErrorHandler(401, "Unauthorized. Please log in.");
    }

    const classInfo = await createClassDB(class_name, user_id);
    return classInfo;
  }

  async getList(userID) {
    const { user_id } = userID;

    if (user_id === null) {
      throw new ErrorHandler(401, "Unauthorized. Please log in.");
    }

    const classObject = await getClassAndUserListDB(user_id);
    return classObject;
  }
}

export default new ClassroomService();
