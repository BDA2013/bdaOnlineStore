const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', (req, res) => {
  Category.findAll({
      include: [ {model: Product} ]
    })
    .then((categoryData) => res.json(categoryData));
  }

);

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [ { model: Product } ]
  })
  .then((categoryData) => res.json(categoryData));
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
