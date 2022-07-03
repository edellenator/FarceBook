import { Thought, User } from '../models';

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // add thought to user
    addThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // add reaction and push to thoughts
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({message: 'No thought found wth this id!'});
          return
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    },
    // remove thought
    removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.commentId })
        .then(deletedThought => {
          if (!deletedThought) {
            res.status(404).json({ message: 'No thought with this id!' });
            return 
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
          );
        })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // FIND THOUGHT BY ID AND PULL REACTION BY ID
    removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: {reactionId: params.reactionId} } },
        { new: true }
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
    }
  };
  
  module.exports = thoughtController;