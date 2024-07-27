const express = require('express');
const router = express.Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController'); 

router.route('/')
    .get(getThoughts)
    .post(createThought); 

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction); 

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

// this style was taken from module 18, esp the miniproject
// i love having the routes written out this way, i think its very neat and clear


module.exports = router;