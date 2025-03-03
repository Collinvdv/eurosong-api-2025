var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const votes = await prisma.votes.groupBy({
    by: ['song_id'],
    _sum: {
      points: true,
    },
    orderBy: {
      _sum: {
        points: 'desc', // Sort by total points in descending order
      },
    }
  });

  let songs = await prisma.songs.findMany({
    include: {
      artists: true
    }
  });

  songs = songs.map((song) => {
    const points = votes.find((vote) => vote.song_id == song.song_id);

    if (points) {
      song.points = points._sum.points;
    } else {
      song.points = null;
    }

    return song;
  })

  res.json(songs);
});

module.exports = router;
