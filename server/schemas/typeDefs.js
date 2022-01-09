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
    job(jobId: ID!): Job
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
    updateJobCompanyName(
        jobId: ID!,
        companyName: String!
    ) : Job
    updateJobTitle(
        jobId: ID!,
        jobTitle: String! 
    ) : Job
    updateJobStatus(
        jobId: ID!,
        status: String!  
    ) : Job
    addTechRequired(
        jobId: ID!,
        techRequired: [String]!
    ) : Job
    addSoftSkillsRequired(
        jobId: ID!,
        softSkillsRequired: [String]!
    ) : Job
    updateJobLink(
        jobId: ID!,
        jobLink: String!  
    ) : Job
    deleteTechRequired(
        jobId: ID!,
        techRequired: [String]!
    ) : Job
    deleteSoftSkillsRequired(
        jobId: ID!,
        softSkillsRequired: [String]!
    ) : Job
}
`

module.exports = typeDefs;