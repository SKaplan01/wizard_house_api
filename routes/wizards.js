const express = require('express');
const db = require('../db');

const router = new express.Router();

// select all wizards, returns id, name, house, image_url
router.get('/', async function(req, res, next) {
  try {
    const results = await db.query(`SELECT * FROM wizards`);
    return res.json({ wizards: results.rows });
  } catch (err) {
    return next(err);
  }
});

//add a new wizard, returns id, name, house, img_url
router.post('/', async function(req, res, next) {
  try {
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

//update a wizard, returning the updated wizard
router.patch('/:id', async function(req, res, next) {
  try {
    const { name, house, img_url } = req.body;
    const result = await db.query(
      `UPDATE wizards SET name=$1, house=$2, image_url=$3
      WHERE id = $4
      RETURNING id, name, house, image_url`,
      [name, house, img_url, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

//delete a wizard, returning {message: 'Deleted'}
router.delete('/:id', async function(req, res, next) {
  try {
    const result = await db.query(`DELETE FROM wizards WHERE id= $1`, [
      req.params.id
    ]);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
