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
    .post(addThought);

// /api/thoughts/<thoughtId>
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

router.route('/:thoughtId/reactions')
    .post(addReaction)
// /api/thoughts/<thoughtId>/reactions/<reactionId>/
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;