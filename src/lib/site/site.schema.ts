import { gql } from 'apollo-server-koa';

const typeDef = gql`
  interface SiteInterface {
    site_id: ID!
    name: String!
    tanks: [TankPayload!]
  }

  type SitePayload implements SiteInterface {
    site_id: ID!
    name: String!
    tanks: [TankPayload!]
  }

  input SaveSite {
    name: String!
  }

  type TankSegmentPayload {
    up_to_cm: Float!
    liters_per_cm: Float!
  }

  input TankSegmentInput {
    up_to_cm: Float!
    liters_per_cm: Float!
  }

  type TankSite {
    site_id: ID!
    "Documentation for name"
    name: String!
  }

  interface TankInterface {
    tank_id: ID!
    site: TankSite!
    name: String!
    segments: [TankSegmentPayload!]!
  }

  type TankPayload implements TankInterface {
    tank_id: ID!
    site: TankSite!
    name: String!
    segments: [TankSegmentPayload!]!
    total_height_cm: Int!
    total_volume_l: Int!
  }

  input SaveTank {
    site_id: String!
    name: String!
    segments: [TankSegmentInput!]!
  }

  type Query {
    sites: [SitePayload!]
    tanks: [TankPayload!]
  }

  type Mutation {
    addSite(input: SaveSite!): SitePayload!
    patchSite(site_id: ID! input: SaveSite!): SitePayload!
    deleteSite(site_id: ID!): ID!

    addTank(input: SaveTank!): TankPayload!
    patchTank(tank_id: ID! input: SaveTank!): TankPayload!
  }
`;

export { typeDef as typeDefSite };
