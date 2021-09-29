import { SiteService } from 'lib/site/site.service';
import { GraphQLResolveInfo } from 'graphql';
import { TankService } from 'lib/site/tank.service';
import { SiteDbFilter, SiteInterface } from 'lib/site/site.interfaces';
import { SiteEntity } from 'lib/site/site.entity';

export async function getSites(
  source: any,
  args: any,
  ctx: {
    siteService: SiteService;
  },
) {
  return await ctx.siteService.getMany();
}

export async function addSite(
  source: any,
  args: Partial<SiteInterface>,
  ctx: {
    siteService: SiteService;
  },
) {
  const newSite = new SiteEntity(args, { source: 'fe' });
  return await ctx.siteService.saveOne(newSite);
}

export async function patchSite(
  source: any,
  args: Partial<SiteInterface>,
  ctx: {
    siteService: SiteService;
  },
) {
  const oldSite = await ctx.siteService.getOne(
    new Map<SiteDbFilter, any>([[SiteDbFilter.SITE_ID, args.site_id]]),
  );
  if (!oldSite.identifier) {
    throw new Error('Site not found');
  }
  delete args.site_id;
  oldSite.resolveData(args, { source: 'fe' });

  return await ctx.siteService.saveOne(oldSite);
}

export async function deleteSite(
  source: any,
  { site_id }: Partial<SiteInterface>,
  ctx: {
    siteService: SiteService;
  },
) {
  const oldSite = await ctx.siteService.getOne(
    new Map<SiteDbFilter, any>([[SiteDbFilter.SITE_ID, site_id]]),
  );
  if (!oldSite.identifier) {
    throw new Error('Site not found');
  }

  await ctx.siteService.deleteOne(oldSite);
  return oldSite.site_id;
}

export async function getTanks(
  { site_id }: { site_id?: string },
  args: any,
  ctx: { tankService: TankService },
  info: GraphQLResolveInfo,
) {
  const tanks = await ctx.tankService.getMany();
  return tanks;
}
