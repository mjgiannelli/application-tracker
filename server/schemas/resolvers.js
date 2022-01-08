const { AuthenticationError } = require('apollo-server-express');

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
        job: async (parent, {_id})=> {
            return Job.findOne({_id})
        }
    },
    Mutation: {

    }
};

module.exports = resolvers;