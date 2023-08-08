const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Tag }, { model: Product }, { model: ProductTag }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productData = await Tag.findByPk(req.params.id, {
      include: [{ model: Tag }, { model: Product }, { model: ProductTag }]
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((newTag) => {
      // Send the newly created row as a JSON object
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      tag_id: req.params.id
    }
  })
  .then((tagId) => {
    // Sends the updated book as a json response
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
