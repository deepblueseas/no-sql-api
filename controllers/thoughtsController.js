const User = require('../models/User');
const Thought = require('../models/Thought');

// in Mongo, populate is used grab a document from another collection
// so here we are GET-ing a thought and then using the ObjectID from reactions in the thoughts schema
// to also pull in all the thoughts related to the corresponding thought id
// that way everything matches up

const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) return res.status(404).json({ message: 'Thought not found'});
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    };

    const updateThought = async (req, res) => {
        try {
            //i love new true, it shows the updated information in the database
            // we're passing the thoughtId in as the request param and making sure we update that specific thought
            // a where statement would be used here if using Pstgres/SQL
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!thought) return res.status(404).json({ message: 'Thought not found' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    const deleteThought = async (req, res) => {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) return res.status(404).json({ message: 'Thought not found' });
    
            // Remove the thought's _id from the associated user's thoughts array
            // the $pull reminds me of the filter method for deleting things in vanilla js
            // and this is similar to the where in SQL to make sure we are only deleting the thoughts with the ID we specified in the param
            await User.updateMany(
                { thoughts: thought._id },
                { $pull: { thoughts: thought._id } }
            );
    
            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    };

    const addReaction = async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                // new true ensures the info we get back in insomia and compass is updated
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'Thought not found' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    const removeReaction = async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                // we're going throught the thought id and then deleting the reaction associated with that thought
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'Thought not found' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    };

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  };