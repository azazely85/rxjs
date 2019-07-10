import errorHandler from '../utils/errorHandler';
import Category from '../models/Category';
import Position from '../models/Position';

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({
      user: req.user.id
    });
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e);
  }
}
module.exports.getById = async function (req, res) {
  try {
    await Category.findById(req.params.id);
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e);
  }
}
module.exports.remove = async function (req, res) {
  try {
    await Category.remove({_id: req.params.id});
    await Position.remove({category: req.params.id});
    res.status(200).json('Category and his position was removed')
  } catch (e) {
    errorHandler(res, e);
  }
}
module.exports.create = async function (req, res) {
  try {
    res.status(200).json(positions)
  } catch (e) {
    errorHandler(res, e);
  }
}
module.exports.update = async function (req, res) {
  try {
    res.status(200).json(positions)
  } catch (e) {
    errorHandler(res, e);
  }
}
