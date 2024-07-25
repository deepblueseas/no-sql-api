const User = require('../models/User');
const Thought = require('../models/Thought');

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