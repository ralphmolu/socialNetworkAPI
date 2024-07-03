const { ADDRCONFIG } = require('dns');
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500) / json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
            if (!User) {
                return res.status(404).json({ message: 'No user found with that id! Please try again.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: re.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!user) {
                res.status(404).json({ message: 'No user found with that Id! Please try again.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(400).json({ message: 'No user found with that Id! Please try again.' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } }); //ensure deletion of deleted user's thoughts
            res.json({ message: 'USer and associated thoughts have been deleted!' });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(400).json({ message: 'No user found with that Id! Please try again.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(400).json({ message: 'No user found with that Id! Please try again.' });
            }
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    }

};



