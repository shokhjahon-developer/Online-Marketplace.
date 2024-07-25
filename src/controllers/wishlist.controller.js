const knex = require("../utils/connection");
const Joi = require("joi");

const get = async (req, res) => {
  try {
    const { id } = req.user;
    const wishlists = await knex("wishlists")
      .select("*")
      .where({ user_id: id })
      .returning("*");

    res.json({ message: "Success", data: wishlists });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const post = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id } = req.body;
    const check = Joi.object({
      product_id: Joi.string().required(),
    });

    const { error } = check.validate({ product_id });
    if (error) return res.status(400).json({ message: error.message });

    const product = await knex("products")
      .where({ id: product_id })
      .returning("*");
    if (!product) {
      return res.json({ message: "Please choose available product!" });
    }

    const newWish = await knex("wishlists")
      .insert({
        user_id: id,
        product_id,
      })
      .returning("*");

    res.json({ message: "Success", data: newWish });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;

    const wishlist = await knex("wishlists").where({ id }).returning("*");
    if (!wishlist) {
      return res.json({ message: "Please choose available ones only!" });
    }

    const check = Joi.object({
      product_id: Joi.string().required(),
    });

    const { error } = check.validate({ product_id });
    if (error) return res.status(400).json({ message: error.message });

    const product = await knex("products").where({ id: product_id });
    if (!product) {
      return res.json({ message: "Please choose available product!" });
    }

    const updatedWishlist = await knex("wishlists")
      .update({
        product_id,
      })
      .where({ id })
      .returning("*");

    res.json({ message: "Success", data: updatedWishlist });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlist = await knex("wishlists").where({ id }).returning("*");
    if (!wishlist) {
      return res.json({ message: "Please choose available ones only!" });
    }

    const deleteWish = await knex("wishlists")
      .del()
      .where({ id })
      .returning("*");
    res.json({ message: "Success", deletedWish: deleteWish });
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
