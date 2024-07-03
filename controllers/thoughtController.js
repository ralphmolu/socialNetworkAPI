const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res){
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }

    },

    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if(!thought){
                res.status(404).json({ message: 'No thought found with that ID! Please try again. ' });
            }
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                {new: true}
            );
            res.json('Created the thought 🎉')
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );
            if(!thought){
                res.status(404).json({ message: 'No thought found with that ID! Please try again. ' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if(!thought){
                res.status(404).json({ message: 'No thought found with that ID! Please try again. ' });
            }
            await User.findOneAndUpdate( // ensure deletion of deleted thought from user's thoughts
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } }
            );
            res.json('Deleted the thought 🎉');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                {runValidators: true, new: true}
            );
            if(!thought){
                res.status(404).json({ message: 'No thought found with that ID! Please try again. ' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                {runValidators: true, new: true}
            );
            if(!thought){
                res.status(404).json({ message: 'No thought found with that ID! Please try again. ' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }


}