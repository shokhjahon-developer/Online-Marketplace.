const { createToken } = require("../utils/jwt");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const knex = require("../utils/connection");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const check = Joi.object({
      fullname: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(12).required(),
    });

    const { error } = check.validate({ fullname, email, password });
    if (error) return res.status(400).json({ message: error.message });

    const users = await knex("users");

    const findUser = users.find((el) => {
      return el.email === email;
    });

    if (findUser) {
      return res
        .status(403)
        .json({ message: "You have already registered with this email!" });
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = await knex("users")
      .insert({ fullname, email, password: hashedPass })
      .returning("*");

    const token = createToken({
      id: newUser[0].id,
      isAdmin: newUser[0].isAdmin,
    });
    res.cookie("token", token);

    res.status(201).json({ message: "Success", data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const verify = Joi.object({
      email: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = verify.validate({ email, password });
    if (error) return res.status(400).json({ message: error.message });

    const users = await knex("users");

    const findUser = users.find((el) => {
      return el.email === email;
    });

    if (!findUser) {
      return res.status(403).json({ message: "Incorrect password or email!" });
    }

    const check = await bcrypt.compare(password, findUser.password);

    if (!check) {
      return res.status(403).json({ message: "Incorrect password or email!" });
    }

    const token = createToken({ id: findUser.id, isAdmin: findUser.isAdmin });
    res.cookie("token", token);

    res.json({ message: "You are successfully logged in!", data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  register,
  login,
};
