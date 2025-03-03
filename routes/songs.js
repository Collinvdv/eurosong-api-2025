const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const data = await prisma.songs.findMany({
    include: {
      artists: true
    }
  });
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const newSong = await prisma.songs.create({
    data: { 
      name: req.body.name,
      artist_id: req.body.artist_id
    }
  });

  res.json(newSong);
})

module.exports = router;
