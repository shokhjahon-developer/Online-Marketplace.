const knex = require("../utils/connection");
const Joi = require("joi");

const get = async (req, res) => {
  try {
    const products = await knex("products");
    res.json({ message: "Success", data: products });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const post = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const check = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.string().required(),
      quantity: Joi.number().required(),
    });

    const { error } = check.validate({ name, description, price, quantity });
    if (error) return res.status(400).json({ message: error.message });

    const newProduct = await knex("products")
      .insert({
        name,
        description,
        price,
        quantity,
      })
      .returning("*");

    res.json({ message: "Success", data: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await knex("products").where({ id }).returning("*");
    if (!product) {
      return res.json({ message: "Please choose available product!" });
    }

    const check = Joi.object({
      name: Joi.string().min(6),
      description: Joi.string(),
      price: Joi.string(),
      quantity: Joi.number(),
    });

    const { error } = check.validate({ name, description, price, quantity });
    if (error) return res.status(400).json({ message: error.message });

    const updatedProduct = await knex("products")
      .update({
        name,
        description,
        price,
        quantity,
      })
      .where({ id })
      .returning("*");

    res.json({ message: "Success", data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await knex("products").where({ id }).returning("*");
    if (!product) {
      return res.json({ message: "Please choose available product!" });
    }
    const deleteProduct = await knex("products")
      .del()
      .where({ id })
      .returning("*");
    res.json({ message: "Success", deletedProduct: deleteProduct });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

module.exports = {
  get,
  put,
  post,
  remove,
};


//josh developer,  mabrur dev,  muhammad husayn