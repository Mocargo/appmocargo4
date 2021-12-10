
const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const {size} = req.params;
  const limit = size || 10;
  for (let index = 0; index < limit; index++){
    products.push({
      name: faker.commerce.productName,
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);

});

router.get('/filter', (req,res)=>{ //enpoint especifico debe ir antes de los dinámicos
    res.send('Soy un filter');
});


router.get('/products/:id', (req,res)=>{
  const {id} = req.params;
  res.json({
    id,
    name: 'Produto 2',
    price: 2000

  });
});

module.exports = router;
