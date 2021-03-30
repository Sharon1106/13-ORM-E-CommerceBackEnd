const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
try {
  const tagData = await Tag.findAll({
      // be sure to include its associated Product data
    include: [
      {
       model: Product,
       attributes: ['id','product_name', 'price', 'stock', 'category_id'],
      },

    ]
  });

  res.status(200).json(tagData);
  if(!tagData) {
    res.status(404).jason({message: 'No tags were found!'})
  }
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    // be sure to include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
 
     include: [
        {
         model: Product,
         attributes: ['id','product_name', 'price', 'stock', 'category_id'],
        },

     ],
   });
   res.status(200).json(tagData);
   if(!tagData) {
     res.status(404).jason({message: 'No tags were found with this id!'})
   }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/',async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      ...req.body,
    }); 
    res.status(200).json(newTag);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTag = await Tag.update(req.body, {
      where: {
        tag_id: req.params.id,
      },
    });

    res.status(200).json(newTag);
    if (!newTag[0]) {
      res.status(404).jason({message: 'No tag with this specific id was found!'});
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy ({
      // be sure to include its associated Products
      where: {
        tag_id: req.params.id,
      },
    });
    
    if (!tagData) {
      res.status(404).jason({message: 'No tag was found!'});
      return;
    } 
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
