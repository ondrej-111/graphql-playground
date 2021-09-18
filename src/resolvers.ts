import {Post, User} from "./database";
import {GraphQLResolveInfo} from "graphql";

async function getUsers(source: any, args: any, context: any, info: GraphQLResolveInfo): Promise<User[]> {
    return [
        {
            id: 'ID1',
            firstName: 'first',
            lastName: 'kast',
            age: 123,
            email: 'email'
        },
        {
            id: 'ID2',
            firstName: 'second',
            lastName: 'test',
            age: 1234,
            email: 'email2'
        }
    ]
}

async function getUser(id: string, args: any, context: any, info: GraphQLResolveInfo): Promise<User> {
    switch (args.id) {
        case 'ID1':
            return {
                id: 'ID1',
                firstName: 'first',
                lastName: 'kast',
                age: 123,
                email: 'email'
            };
        case 'ID2':
            return{
            id: 'ID2',
                firstName: 'second',
            lastName: 'test',
            age: 1234,
            email: 'email2'
        };
    }
}

async function getPostsByUser({id}: User, args: any, context: any, info: GraphQLResolveInfo): Promise<Post[]> {
    let result;
    if (id === 'ID1') {
        result = [
            {
                id: 'post1',
                title: 'title1',
                body: 'post by user ID1',
            }
        ];
    } else {
        result = [
            {
                id: 'post2',
                title: 'title2',
                body: 'post by user ID2',
            }
        ];
    }
    return result;
}

async function getAuthorForPost({authorId}: Post): Promise<User | undefined> {
    if (authorId === 'ID1') {
        return {
            id: 'ID1',
            firstName: 'first',
            lastName: 'kast',
            age: 123,
            email: 'email'
        };
    }
}

async function getPosts(): Promise<Post[]> {
    return [
        {
            id: 'post2',
            title: 'title2',
            body: 'post by user',
            authorId: 'ID1'
        },
        {
            id: 'post1',
            title: 'title1',
            body: 'body1',
        }
    ];
}

async function computeName(source: User, args: any, context: any, info: GraphQLResolveInfo): Promise<string> {
    return `${source.firstName} ${source.lastName}`;
}

const resolvers = {
    Query: {
        users: getUsers,
        posts: getPosts,
        user: getUser
    },
    User: {
        name: computeName,
        posts: getPostsByUser,
    },
    Post: {
        author: getAuthorForPost
    }
}

export default resolvers;
