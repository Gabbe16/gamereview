const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Game reviews' })
})

const pool = require('../db')

router.get('/reviews', async (req, res) => {
  try {
    const id = req.params.id
    const [reviews] = await pool .promise().query(`SELECT * FROM gabriel_reviews JOIN gabriel_games ON gabriel_reviews.game_id = gabriel_games.id`)
    console.log(reviews)
    res.render('reviews.njk', {
      title: 'Alla spelrecensioner',
      reviews: reviews,
      author: "Gabriel"
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/reviews/new', async function (req, res) {
  try {
    const [reviews] = await pool.promise().query('SELECT * FROM gabriel_reviews')
    return res.render('newreview.njk', {
      title: 'Ny review',
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/reviews/:id/delete', async function (req, res) {
  try {
    const [result] = await pool.promise().query(
      `DELETE FROM gabriel_reviews WHERE id = ?`,
      [req.params.id]
    )
    res.redirect('/reviews')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// De två routes nedanför behöver fortfarande ändras

router.get('/reviews/:id', async function (req, res) {
  try {
    const [catsWithBreed] = await pool.promise().query(
      `SELECT jens_cat.*, jens_cat_breed.name as breed, jens_cat_breed.description
      FROM jens_cat 
      JOIN jens_cat_breed
      ON jens_cat.breed_id = jens_cat_breed.id
      WHERE jens_cat.id = ?`, [req.params.id]
    );
    // jag måste ange att jag vill ha första elementet i arrayen,
    // annars får jag en array med en katt
    return res.render('review.njk', {
      title: 'Katt - ' + catsWithBreed[0].name,
      cat: catsWithBreed[0]
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/reviews', async function (req, res) {
  // res.json(req.body) för att kolla och kika den data vi får från front-end
  try {
    const [result] = await pool.promise().query(
      `INSERT INTO jens_cat (name, age, breed_id)
      VALUES (?, ?, ?)`,
      [req.body.name, req.body.age, req.body.breed]
    )
    res.redirect('/reviews')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router