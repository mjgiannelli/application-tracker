const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    jobCount: Int
    jobs: [Job]
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
    jobs(username: String) : [Jobs]
    job(_id: ID!): Job
}
`