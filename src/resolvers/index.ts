import {
  fResolverSite,
  injectResolverSites,
  qResolverSite,
} from 'resolvers/site';

export interface ResolverInjectionInterface {
  [resolver: string]: () => { [serviceName: string]: object };
}

const resolvers = {
  Query: {
    ...qResolverSite,
  },
  ...fResolverSite,
};

const resolversInjections: ResolverInjectionInterface = {
  ...injectResolverSites,
};

export { resolvers, resolversInjections };
