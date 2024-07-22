const User = require('../models/User');
const Thought = require('../models/Thought');

const getUsers = async (req, res) => {
    try {
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



    module.exports = {
        getUsers,
        getSingleUser,
        createUser,
        updateUser,
        deleteUser,
        addFriend,
        removeFriend
      };