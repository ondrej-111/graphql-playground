import { gql } from 'apollo-server-koa';

const typeDef = gql`
  "Site documentation"
  type Site {
    site_id: ID!
    "Documentation for name"
    name: String!
    """
    List of tanks
    """
    tanks: [Tank]
  }

  type AddSite {
    name: String
  }

  type TankSegment {
    up_to_cm: Int!
    liters_per_cm: Int!
  }

  type Tank {
    tank_id: ID!
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

  type Mutation {
    addSite(name: String!): Site!
    patchSite(site_id: ID!, name: String!): Site!
    deleteSite(site_id: ID!): ID!
  }
`;

export { typeDef as typeDefSite };
