import {gql} from 'apollo-server-express';

export default gql`
    type Post {
        id: ID!
        title: String!
        body: String!
        author: User
    }
    
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        name: String!
        age: Int
        email: String
        posts: [Post]
    }

    type Query {
        users: [User]
        user(id: ID): User
        posts: [Post]
    }
`;
