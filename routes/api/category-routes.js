const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/',async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include:[
        {
          model: Product,
          attributes: ['id','product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    //if route is hit send back package json of category data
    res.status(200).json(categoryData);
    if(!categoryData) {
      res.status(404).jason({message: 'No categories were found!'})
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
       // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ['id','product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    res.status(200).json(categoryData);
    if(!categoryData) {
      res.status(404).jason({message: 'No item was found!'})
    } 

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/',async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      ...req.body,
    }); 
    res.status(200).json(newCategory);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
    });

    res.status(200).json(newCategory);
    if (!newCategory[0]) {
      res.status()
      res.status(404).jason({message: 'No category with this specific id was found!'});
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy ({
      // be sure to include its associated Products
      where: {
        category_id: req.params.id,
      },
    });
    
    if (!categoryData) {
      res.status(404).jason({message: 'No category with this specific id was found!'});
      return;
    } 
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;