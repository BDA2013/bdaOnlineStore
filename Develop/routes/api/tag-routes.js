const router = require('express').Router();
const { Tag, Product } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
      include: [ { model: Product } ]
    })
    .then((tagData) => {
      res.json(tagData);
    });
  });

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
      include: [ { model: Product } ]
    })
    .then((tagData) => {
      res.json(tagData);
    });
});
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((tagId) => {
    res.json(tagId);
  })
  .catch((err) => res.json(err))
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
