const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');

const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('jobs')
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('jobs')
        },
        job: async (parent, { _id }) => {
            return Job.findOne({ _id })
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with that email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Password provided is incorrect');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        updatePassword: async (parent, {username, password}, context) => {

            const saltRounds = 10;
            password = await bcrypt.hash(password, saltRounds);

            const updatedUser = await User.findOneAndUpdate(
                {username: username},
                {password: password},
                {new: true}
            )
            return updatedUser
        },
        addJob: async (parent, args, context) => {
            console.log('args', args)

            if (context.user) {
                const job = await Job.create ({...args, username: context.user.username});

                

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {jobs: job._id}},
                    {new: true}
                );

                return job;
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        updateJob: async (parent, args, context) => {
            if (context.user) {
                console.log(args)
            }
        },
        deleteJob: async (parent, {jobId}, context) => {
            if(context.user) {
                const deletedJob = await Job.findByIdAndDelete(
                    {_id: jobId}
                )

                return deletedJob
            }
        }
    }
};

module.exports = resolvers;