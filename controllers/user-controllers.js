import { Thought, User } from '../models';

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // createPizza
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // add friend and push to User
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: body } },
          { new: true, runValidators: true }
        )
        .then(dbUserData => {
          if(!dbUserData) {
            res.status(404).json({message: 'No user found wth this id!'});
            return
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
      },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // find user by id and pull friend by id
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: {_id: params.friendId} } },
          { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
      }
};

module.exports = userController;