import authService from "../services/auth.service.js";

const test = (req, res) => {
  res.json("test is working");
};

// Registration endpoint
const registerUser = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

// Login endpoint
const loginUser = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);

    res.cookie("token", token);

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

export { test, registerUser, loginUser };
