import User from "../models/UserModel.js";

// Create a new user
export const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = new User({
      email,
      password,
      role,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating user", error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error retrieving users", error });
  }
};
