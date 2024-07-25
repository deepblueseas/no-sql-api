const express = require('express');
const router = express.Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtsRoutes');

router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;