var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try {
    const users = await prisma.artists.findMany();
    res.json(users);
  } catch (error) {

    res.status(500).json({ error: 'Error fetching users' });
  }
});

router.get('/songs', async(req, res, next) => {
  try {
    const songs = await prisma.songs.findMany({
      include: { artists: true }
    });
    res.json(songs);
  } catch (error) {

    res.status(500).json({ error: 'Error fetching songs' });
  }
});

module.exports = router;
