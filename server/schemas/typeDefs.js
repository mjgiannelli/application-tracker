const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    questionOne: String
    answerOne: String
    questionTwo: String
    answerTwo: String
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
    techRequired: [String]
    softSkillsRequired: [String]
    jobLink: String
    status: String
    username: String
}

type Query {
    users: [User]
    user(username: String): User
    jobs(username: String) : [Job]
    job(_id: ID!): Job
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
        username: String!, 
        email: String!, 
        password: String!, 
        questionOne: String!,
        answerOne: String!,
        questionTwo: String!,
        answerTwo: String!
        ): Auth
    addJob(
        companyName: String!,
        jobTitle: String!,
        dateApplied: String,
        techRequired: [String],
        softSkillsRequired: [String],
        jobLink: String,
        username: String!
    ): User
    deleteUser(username: String!, password: String!): User
    deleteJob(_id: ID!, username: String!): User
    updatePassword(username: String!, password: String!): User
    updateJob(
        _id: ID!,
        companyName: String,
        jobTitle: String,
        dateApplied: String,
        techRequired: [String],
        softSkillsRequired: [String],
        jobLink: String,
        username: String!
    ) : User
}
`