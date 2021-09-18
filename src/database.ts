export interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    body: string;
    authorId?: string;
}
