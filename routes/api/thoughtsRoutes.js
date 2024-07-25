const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController.js');

// These are written out very simply in the routes folder
// the controllers contain the code for finding by id etc

// Route to get all thoughts
router.get('/', getThoughts);

// Route to get a single thought by id
router.get('/:thoughtId', getSingleThought);

// Route to create a new thought
router.post('/', createThought);

// Route to update a thought
router.put('/:thoughtId', updateThought);

// Route to delete a thought
router.delete('/:thoughtId', deleteThought);

// Route to add a reaction
router.post('/:thoughtId/reactions', addReaction);

// Route to remove a reaction
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
