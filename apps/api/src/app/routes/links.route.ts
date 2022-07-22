const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Link = require('../models/link.models');
const router = Router();
const config = require('config');

router.post('/generate', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/getLinks', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/getLinks:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
