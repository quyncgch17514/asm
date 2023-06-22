var express = require('express');
const LegoModel = require('../models/LegoModel');
var router = express.Router();

router.get('/crud', async (req, res) => {
  var legos = await LegoModel.find({});
  var total = await LegoModel.count();
  res.render('lego/crud', { legos : legos , total : total })
})

router.get('/', async (req, res) => {
  var legos = await LegoModel.find({});
  res.render('lego/index', { legos: legos });
})

router.get('/delete/:id', async(req, res) => {
  await LegoModel.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete lego succeed !')})
  .catch((err) => { console.log ('Delete lego failed !')});
  res.redirect('/lego/crud');
})

router.get('/drop', async(req, res) => {
  await LegoModel.deleteMany({})
  .then(() => { console.log ('Delete all legos succeed !')});
  res.redirect('/lego/crud');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var lego = await LegoModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('lego/order_confirm', { lego : lego, order_quantity : order_quantity, total_price : total_price});
})

router.get('/add', (req, res) => {
  res.render('lego/add');
})

router.post('/add', async (req, res) => {
  var lego = req.body;
  await LegoModel.create(lego)
  .then(() => { console.log ('Add new lego succeed !')});
  res.redirect('/lego/crud');
})

router.get('/edit/:id', async (req, res) => {
  var lego = await LegoModel.findById(req.params.id);
  res.render('lego/edit', { lego : lego});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await LegoModel.findByIdAndUpdate(id,
  {
    name: req.body.name,
    brand: req.body.brand,
    quantity: req.body.quantity,
    image: req.body.image,
    video: req.body.video,
    price: req.body.price
  })
  .then(() => { console.log('Edit lego succeed !') });
  res.redirect('/lego/crud');
})



module.exports = router;