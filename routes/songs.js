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

router.post('/', (req, res, next) => {
  res.send("Just created new record");
})

module.exports = router;
