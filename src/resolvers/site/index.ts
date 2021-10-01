import { SiteService } from 'lib/site/site.service';
import {
  addSite,
  addTank,
  deleteSite,
  getSites,
  getTanks,
  patchSite,
  patchTank,
} from 'resolvers/site/site.resolvers';
import { ResolverInjectionInterface } from 'resolvers/index';
import { Container } from 'typedi';
import { TankService } from 'lib/site/tank.service';

const injection = () => {
  return {
    siteService: Container.get(SiteService),
    tankService: Container.get(TankService),
  };
};

export const injectResolver: ResolverInjectionInterface = {
  sites: injection,
  addSite: injection,
  deleteSite: injection,
  patchSite: injection,

  tanks: injection,
  addTank: injection,
  patchTank: injection,
};

const queryR = {
  sites: getSites,
  tanks: getTanks,
};

const mutationR = {
  addSite: addSite,
  patchSite: patchSite,
  deleteSite: deleteSite,

  addTank: addTank,
  patchTank: patchTank,
};

const fieldR = {
  SitePayload: {
    tanks: getTanks,
  },
};

export {
  queryR as qResolverSite,
  mutationR as qMutationSite,
  fieldR as fResolverSite,
  injectResolver as injectResolverSites,
};
