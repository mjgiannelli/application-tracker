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
        job: async (parent, { jobId }) => {
            return Job.findOne({ jobId })
        },
        jobs: async () => {
            return Job.find()
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
        updatePassword: async (parent, { username, password }, context) => {

            const saltRounds = 10;
            password = await bcrypt.hash(password, saltRounds);

            const updatedUser = await User.findOneAndUpdate(
                { username: username },
                { password: password },
                { new: true }
            )
            return updatedUser
        },
        addJob: async (parent, args, context) => {

            if (context.user) {
                const job = await Job.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { jobs: job._id } },
                    { new: true }
                );

                return job;
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        updateJobCompanyName: async (parent, { jobId, companyName }, context) => {

            if (context.user) {
                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { companyName: companyName },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        updateJobIndustry: async (parent, { jobId, industry }, context) => {

            if (context.user) {
                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { industry: industry },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        updateJobTitle: async (parent, { jobId, jobTitle }, context) => {

            if (context.user) {
                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { jobTitle: jobTitle },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        updateJobStatus: async (parent, { jobId, status }, context) => {

            if (context.user) {
                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { status: status },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        updateJobLink: async (parent, { jobId, jobLink }, context) => {

            if (context.user) {
                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { jobLink: jobLink },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        addTechRequired: async (parent, { jobId, techRequired }, context) => {

            if (context.user) {

                console.log('tech', techRequired)

                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { $push: { techRequired: { $each: techRequired } } },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        addSoftSkillsRequired: async (parent, { jobId, softSkillsRequired }, context) => {

            if (context.user) {

                console.log('tech', softSkillsRequired)

                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { $push: { softSkillsRequired: { $each: softSkillsRequired } } },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        deleteTechRequired: async (parent, { jobId, techRequired }, context) => {

            if (context.user) {

                console.log('tech', techRequired)

                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { $pull: { techRequired: { $in: techRequired } } },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        deleteSoftSkillsRequired: async (parent, { jobId, softSkillsRequired }, context) => {

            if (context.user) {

                console.log('tech', softSkillsRequired)

                const updatedJob = await Job.findByIdAndUpdate(
                    { _id: jobId },
                    { $pull: { softSkillsRequired: { $in: softSkillsRequired } } },
                    { new: true }
                )
                return updatedJob
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        deleteJob: async (parent, { jobId }, context) => {
            if (context.user) {
                const deletedJob = await Job.findByIdAndDelete(
                    { _id: jobId }
                )

                return deletedJob
            }
        },
        deleteAccount: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Password provided is incorrect');
            }

            const deletedUser = await User.findOneAndDelete(
                { email: email }
            )

            const deletedJobs = await Job.deleteMany(
                {username: user.username}
            )

            return deletedUser
        }
    }
};

module.exports = resolvers;