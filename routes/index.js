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
    const [games] = await pool.promise().query('SELECT * FROM gabriel_games')
    return res.render('newreview.njk', {
      title: 'Ny review',
      games: games,
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
    const [reviewWithGame] = await pool.promise().query(
      `SELECT gabriel_reviews.*, gabriel_games.name as game, gabriel_games.description
      FROM gabriel_reviews
      JOIN gabriel_games
      ON gabriel_reviews.game_id = gabriel_games.id
      WHERE gabriel_reviews.id = ?`, [req.params.id]
    );
    // jag måste ange att jag vill ha första elementet i arrayen,
    // annars får jag en array med en katt
    return res.render('review.njk', {
      title: 'Spel - ' + reviewWithGame[0].name,
      review: reviewWithGame[0]
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
      `INSERT INTO gabriel_reviews (text, score, game_id)
      VALUES (?, ?, ?)`,
      [req.body.text, req.body.score, req.body.game]
    )
    res.redirect('/reviews')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router