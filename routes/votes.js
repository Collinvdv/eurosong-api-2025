var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.post('/', async (req, res, next) => {

  const newVote = await prisma.votes.create({
    data: { 
      points: req.body.points,
      song_id: req.body.song_id,
      voter_id: req.body.voter_id
    }
  });

  res.json(newVote);
})

module.exports = router;
