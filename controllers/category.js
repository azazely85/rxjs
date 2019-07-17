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
    const category = new Category({
      name: req.body.name,
      imageSrc: req.file ? req.file.path : '',
      user: req.user.id
    });
    await category.save();
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e);
  }
}
module.exports.update = async function (req, res) {
  try {
    const updated = {
      name: req.body.name
    };
    if (req.file) {
      updated.imageSrc = req.file.path;
    }
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.status(201).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
}
