// language=GraphQL
const typeDef = `
    "Site documentation"
    type Site {
        id: ID!
        "Documentation for name"
        name: String!
        """
        List of tanks
        """
        tanks: [Tank]
    }

    type TankSegment {
        up_to_cm: Int!
        liters_per_cm: Int!
    }

    type Tank {
        id: ID!
        site: Site
        name: String!
        total_height_cm: Int!
        total_volume_l: Int!
        segments: [TankSegment]
    }

    type Query {
        sites: [Site]
        tanks: [Tank]
    }
`;

export { typeDef as typeDefSite };
