// const User = require('../models/User');
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

    //attach this to user?

module.exports = {
    getThoughts,
    getSingleThought,
    createThought
  };