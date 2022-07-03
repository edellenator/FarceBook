const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById, 
    addThought,
    updateThought, 
    addReaction,
    removeThought,
    removeReaction 
} = require('../../controllers/thought-controllers');
// /api/thoughts/
router.route('/')
    .get(getAllThoughts)
// /api/thoughts/<thoughtId>
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
// /api/thoughts/<userId>
// add a thought and push to userId
router.route('/:userId')
    .post(addThought);

// /api/thoughts/<thoughtId>/reactions
router.route('/:thoughtId/reactions')
    .put(addReaction)

// /api/thoughts/<thoughtId>/reactions/<reactionId>/
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;