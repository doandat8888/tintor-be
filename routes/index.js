const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const uploadRoutes = require('./upload');

const router = express.Router();

router.use('/auth', authRoutes); 
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;