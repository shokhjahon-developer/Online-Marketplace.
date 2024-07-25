const knex = require("../utils/connection");
const Joi = require("joi");

const get = async (req, res) => {
  try {
    const { id } = req.user;

    const orders = await knex("orders")
      .select("*")
      .where({ user_id: id })
      .returning("*");

    res.json({ message: "Success", data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const post = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id, total_amount, status } = req.body;
    const check = Joi.object({
      product_id: Joi.string().min(6).required(),
      status: Joi.string(),
      total_amount: Joi.number().required(),
    });

    const { error } = check.validate({ product_id, status, total_amount });
    if (error) return res.status(400).json({ message: error.message });

    const product = await knex("products")
      .where({ id: product_id })
      .returning("*");
    if (!product) {
      return res.json({ message: "Please choose available product!" });
    }

    const newOrder = await knex("orders")
      .insert({
        user_id: id,
        product_id,
        total_amount,
        status,
      })
      .returning("*");

    res.json({ message: "Success", data: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, total_amount, status } = req.body;

    const order = await knex("orders").where({ id }).returning("*");
    if (!order) {
      return res.json({ message: "Please choose available order!" });
    }

    const check = Joi.object({
      product_id: Joi.string().min(6).required(),
      status: Joi.string(),
      total_amount: Joi.number().required(),
    });

    const { error } = check.validate({ product_id, status, total_amount });
    if (error) return res.status(400).json({ message: error.message });

    const product = await knex("products")
      .where({ id: product_id })
      .returning("*");
    if (!product) {
      return res.json({ message: "Please choose available product!" });
    }

    const updatedOrder = await knex("orders")
      .update({
        product_id,
        status,
        total_amount,
      })
      .where({ id })
      .returning("*");

    res.json({ message: "Success", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await knex("orders").where({ id }).returning("*");
    if (!order) {
      return res.json({ message: "Please choose available order!" });
    }

    const deleteOrder = await knex("orders").del().where({ id }).returning("*");
    res.json({ message: "Success", deletedOrder: deleteOrder });
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
