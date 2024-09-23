import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(404).send("No Users Found");
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(`error for getAllUsers:`, error);
    res.sendStatus(500);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("No User Found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(`error for getUserById:`, error);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ msg: "Request body is empty" });
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(`error for createUser:`, error);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Request body is empty" });
    }

    const newUserData = await user.update(req.body);
    res.status(200).json(newUserData);
  } catch (error) {
    console.log(`error for updateUser:`, error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();
    res.status(204).end();
  } catch (error) {
    console.log("error in deleteUser controller", error);
    res.sendStatus(500);
  }
};

export { getAllUsers,getUserById ,createUser, updateUser, deleteUser };
