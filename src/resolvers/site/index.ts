import { SiteService } from 'lib/site/site.service';
import { getSites, getTanks } from 'resolvers/site/resolvers';
import { ResolverInjectionInterface } from 'resolvers/index';

export const injectResolver: ResolverInjectionInterface = {
  sites: () => {
    return {
      siteService: SiteService,
    };
  },
};

const queryR = {
  sites: getSites,
};

const fieldR = {
  Site: {
    tanks: getTanks,
  },
};

export {
  queryR as qResolverSite,
  fieldR as fResolverSite,
  injectResolver as injectResolverSites,
};
