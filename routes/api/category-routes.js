const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find one category by id
router.get('/:id', (req, res) => {
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => res.status(500).json(err));
});

// Update a category by id
router.put('/:id', (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

// Delete a category by id
router.delete('/:id', (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
