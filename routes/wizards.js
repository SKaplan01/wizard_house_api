const express = require('express');
const db = require('../db');
const Wizard = require('../models/wizard');

const router = new express.Router();

// select all wizards, returns id, name, house, image_url
router.get('/', async function(req, res, next) {
  try {
    let wizards = await Wizard.getAll();
    return res.json({ wizards });
  } catch (err) {
    return next(err);
  }
});

//select a random wizard, returns id, name, house, image_url
router.get('/random', async function(req, res, next) {
  try {
    let wizard = await Wizard.getRandom();
    return res.json(wizard);
  } catch (err) {
    return next(err);
  }
});

//add a new wizard, returns id, name, house, img_url
router.post('/', async function(req, res, next) {
  try {
    let { name, house, image_url } = req.body;
    let id = await Wizard.create(name, house, image_url);
    return res.json(id);
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
