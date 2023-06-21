var express = require('express');
const GundamModel = require('../models/GundamModel');
var router = express.Router();

router.get('/crud', async (req, res) => {
  var gundams = await GundamModel.find({});

  var total = await GundamModel.count();
  //console.log(gundams);
  //res.send(gundams);
  res.render('crud', { gundams : gundams , total : total })
})

router.get('/', async (req, res) => {
  var gundams = await GundamModel.find({});
  res.render('index', { gundams: gundams });
})

router.get('/delete/:id', async(req, res) => {
  // var id = req.params.id;
  // var gundam = await GundamModel.findById(id);
  // await GundamModel.deleteOne(gundam);

  await GundamModel.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete gundam succeed !')})
  .catch((err) => { console.log ('Delete gundam failed !')});

  res.redirect('/crud');
})

router.get('/drop', async(req, res) => {
  await GundamModel.deleteMany({})
  .then(() => { console.log ('Delete all gundams succeed !')});
  
  res.redirect('/crud');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var gundam = await GundamModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { gundam : gundam, order_quantity : order_quantity, total_price : total_price});
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var gundam = req.body;
  await GundamModel.create(gundam)
  .then(() => { console.log ('Add new gundam succeed !')});
  res.redirect('/crud');
})

router.get('/edit/:id', async (req, res) => {
  var gundam = await GundamModel.findById(req.params.id);
  res.render('edit', { gundam : gundam});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await GundamModel.findByIdAndUpdate(id)
  .then(() => { console.log('Edit gundam succeed !') });
  res.redirect('/crud');
})



module.exports = router;