const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Game reviews' })
})

const pool = require('../db')

router.get('/dbtest/:id', async (req, res) => {
  try {
    const id = req.params.id
    const [reviews] = await pool .promise().query(`SELECT * FROM gabriel_reviews JOIN gabriel_games ON gabriel_reviews.game_id = gabriel_games.id WHERE game_id = ${id}`)
    console.log(reviews)
    res.render('reviews.njk', {
      title: reviews[0].title,
      reviews: reviews,
      author: "Gabriel"
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router