var express = require('express');
const GundamModel = require('../models/GundamModel');
const LegoModel = require('../models/LegoModel');
var router = express.Router();


router.get('/', async (req, res) => {
  var gundams = await GundamModel.find({});
  var legos = await LegoModel.find({});
  res.render('index', { gundams: gundams, legos: legos });
})

module.exports = router;