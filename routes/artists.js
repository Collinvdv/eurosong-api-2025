var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const data = await prisma.artists.findMany();
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const checkArtist = await prisma.artists.findMany({
    where: {
      name: req.body.name
    }
  });

  if (checkArtist.length > 0) {
    res.json({
      "message": "Already an artist with the same name"
    });
  } else {

    const newArtist = await prisma.artists.create({
      data: { 
        name: req.body.name
      }
    });
  
    res.json(newArtist);
  }

})

module.exports = router;
