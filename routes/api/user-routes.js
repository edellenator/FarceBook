const router = require('express').Router();
const { 
    getAllUser, 
    getUserById, 
    createUser,
    addFriend, 
    updateUser,
    deleteUser,
    removeFriend 
} = require('../../controllers/user-controllers');

// Set up GET all and POST at /api/users
router.route('/')
    .get(getAllUser)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);



// Update User pull friend
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)



module.exports = router;