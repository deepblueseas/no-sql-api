const User = require('../models/User');
const Thought = require('../models/Thought');

const getUsers = async (req, res) => {
    try {
        // we are getting a user and also the thoughts and friends associated with that user by populate
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json(err); 
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if user has thoughts before attempting to delete
        // similar to cascade in sql, this makes sure there is no orphan data
        // $in in a mongo query operator... it is checking to see if user id = the userId in the params and deleting thoughts associated
        if (user.thoughts.length) {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
        }

        res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
};