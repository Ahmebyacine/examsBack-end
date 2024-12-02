const express = require('express');
const { protect } = require('../Services/authServices');
const { addFavorites, currentAddExercise, currentToArchive,removeFavorites,removeCurrent } = require('../Services/userServices');

const router = express.Router();

// Add to Favorites
router.post('/favorites/add',protect,addFavorites);
// delete frorm Favorites
router.post('/favorites/delete',protect,removeFavorites);

// Add to Current List
router.post('/current/add',protect,currentAddExercise);
// Add to Current List
router.post('/current/delete',protect,removeCurrent);

// Archive Current List
router.post('/current/archive',protect,currentToArchive);

module.exports = router;