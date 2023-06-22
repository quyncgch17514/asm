var express = require('express');
const GundamModel = require('../models/GundamModel');
var router = express.Router();

router.get('/crud', async (req, res) => {
  var gundams = await GundamModel.find({});
  var total = await GundamModel.count();
  res.render('gundam/crud', { gundams : gundams , total : total })
})

router.get('/', async (req, res) => {
  var gundams = await GundamModel.find({});
  res.render('gundam/index', { gundams: gundams });
})

router.get('/delete/:id', async(req, res) => {
  await GundamModel.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete gundam succeed !')})
  .catch((err) => { console.log ('Delete gundam failed !')});
  res.redirect('/gundam/crud');
})

router.get('/drop', async(req, res) => {
  await GundamModel.deleteMany({})
  .then(() => { console.log ('Delete all gundams succeed !')});
  res.redirect('/gundam/crud');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var gundam = await GundamModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('gundam/order_confirm', { gundam : gundam, order_quantity : order_quantity, total_price : total_price});
})

router.get('/add', (req, res) => {
  res.render('gundam/add');
})

router.post('/add', async (req, res) => {
  var gundam = req.body;
  await GundamModel.create(gundam)
  .then(() => { console.log ('Add new gundam succeed !')});
  res.redirect('/gundam/crud');
})

router.get('/edit/:id', async (req, res) => {
  var gundam = await GundamModel.findById(req.params.id);
  res.render('gundam/edit', { gundam : gundam});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await GundamModel.findByIdAndUpdate(id,
  {
    name: req.body.name,
    brand: req.body.brand,
    quantity: req.body.quantity,
    image: req.body.image,
    video: req.body.video,
    price: req.body.price
  })
  .then(() => { console.log('Edit gundam succeed !') });
  res.redirect('/gundam/crud');
})



module.exports = router;