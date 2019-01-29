const express = require('express');
const db = require('../db');

const router = new express.Router();

router.get('/', async function(req, res, next) {
  try {
    // select all wizards, returns id, name, house, image_url
    const results = await db.query(`SELECT * FROM wizards`);
    return res.json({ wizards: results.rows });
  } catch (err) {
    return next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    //add a new wizard, returns id, name, house, img_url
    let { name, house, img_url } = req.body;
    const result = await db.query(
      `INSERT INTO wizards (name, house, image_url)
      VALUES($1, $2, $3)
      RETURNING id, name, house, image_url`,
      [name, house, img_url]
    );
    return res.json({ wizard: result.rows });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
