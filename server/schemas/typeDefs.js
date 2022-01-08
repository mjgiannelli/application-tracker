const { gql } = require('apollo-server-express');

// to do: add back security questions and answers

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    jobCount: Int
    jobs: [Job]
}

type Auth {
    token: ID!
    user: User
}

type Job {
    _id: ID,
    companyName: String
    jobTitle: String
    dateApplied: String
    techRequiredCount: Int
    techRequired: [String]
    softSkillsRequiredCount: Int
    softSkillsRequired: [String]
    jobLink: String
    status: String
    username: String
}

type Query {
    users: [User]
    user(username: String!): User
    job(_id: ID!): Job
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
        username: String!, 
        email: String!, 
        password: String!
        ): Auth
    addJob(
        companyName: String!,
        jobTitle: String!,
        techRequired: [String],
        softSkillsRequired: [String],
        jobLink: String,
    ): Job
    deleteUser(username: String!, password: String!): User
    deleteJob(jobId: ID!): User
    updatePassword(username: String!, password: String!): User
    updateJob(
        jobId: ID!,
        companyName: String,
        jobTitle: String,
        dateApplied: String,
        techRequired: [String],
        softSkillsRequired: [String],
        jobLink: String
    ) : Job
}
`

module.exports = typeDefs;