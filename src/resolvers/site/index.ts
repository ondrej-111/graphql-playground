import { SiteService } from 'lib/site/site.service';
import {
  addSite,
  deleteSite,
  getSites,
  getTanks,
  patchSite,
} from 'resolvers/site/site.resolvers';
import { ResolverInjectionInterface } from 'resolvers/index';
import { Container } from 'typedi';
import { TankService } from 'lib/site/tank.service';

const injection = () => {
  return {
    siteService: Container.get(SiteService),
    TankService: Container.get(TankService),
  };
};

export const injectResolver: ResolverInjectionInterface = {
  sites: injection,
  addSite: injection,
  deleteSite: injection,
  patchSite: injection,
  tanks: injection,
};

const queryR = {
  sites: getSites,
};

const mutationR = {
  addSite: addSite,
  patchSite: patchSite,
  deleteSite: deleteSite,
};

const fieldR = {
  Site: {
    tanks: getTanks,
  },
};

export {
  queryR as qResolverSite,
  mutationR as qMutationSite,
  fieldR as fResolverSite,
  injectResolver as injectResolverSites,
};
