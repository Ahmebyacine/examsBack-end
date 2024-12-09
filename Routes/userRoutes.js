const express = require('express');
const { protect } = require('../Services/authServices');
const { addFavorites, 
        currentAddExercise, 
        currentToArchive,
        removeFavorites,
        removeCurrent,
        allUsers, 
        getUser, 
        updateUser, 
        deleteUser 
    } = require('../Services/userServices');

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

//Admin side
router.get('/', allUsers);
  
  // Get user by ID
  router.get('/:id',getUser );
  
  // Update user by ID
  router.put('/:id',updateUser );
  
  // Delete user by ID
  router.delete('/:id',deleteUser);

module.exports = router;