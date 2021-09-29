import {
  fResolverSite,
  injectResolverSites,
  qMutationSite,
  qResolverSite,
} from 'resolvers/site';

export interface ResolverInjectionInterface {
  [resolver: string]: () => { [serviceName: string]: object };
}

const resolvers = {
  Query: {
    ...qResolverSite,
  },
  Mutation: {
    ...qMutationSite,
  },
  ...fResolverSite,
};

const resolversInjections: ResolverInjectionInterface = {
  ...injectResolverSites,
};

export { resolvers, resolversInjections };
