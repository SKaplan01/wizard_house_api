// Wizard class for harry_potter_game
const db = require('../db');

class Wizard {
  constructor(id, name, house, image_url) {
    this.id = id;
    this.name = name;
    this.house = house;
    this.image_url = image_url;
  }
  // get all wizards, returns id, name, house, image_url
  static async getAll() {
    const results = await db.query(`SELECT * FROM wizards`);
    return results.rows.map(
      wiz => new Wizard(wiz.id, wiz.name, wiz.house, wiz.image_url)
    );
  }

  //get a random wizard, returns id, name, house, image_url
  static async getRandom() {
    let list = await db.query(`SELECT id FROM wizards`);
    let wizardIds = list.rows.map(wiz => wiz.id);
    let randomId = wizardIds[Math.floor(Math.random() * wizardIds.length)];
    let result = await db.query(`SELECT * FROM wizards WHERE id=$1`, [
      randomId
    ]);
    let wiz = result.rows[0];
    return new Wizard(randomId, wiz.name, wiz.house, wiz.image_url);
  }

  //create a new wizard, returns id, name, house, img_url
  static async create(name, house, image_url) {
    const result = await db.query(
      `INSERT INTO wizards (name, house, image_url)
      VALUES ($1, $2, $3) RETURNING id`,
      [name, house, image_url]
    );
    let { id } = result.rows[0];
    return new Wizard(id, name, house, image_url);
  }
}

module.exports = Wizard;
