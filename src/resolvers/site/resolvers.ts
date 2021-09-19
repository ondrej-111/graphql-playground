import { SiteService } from 'lib/site/site.service';
import { GraphQLResolveInfo } from 'graphql';

export async function getSites(
  source: any,
  args: any,
  ctx: {
    siteService: SiteService;
  },
  info: GraphQLResolveInfo,
) {
  await ctx.siteService.getMany();
  return [
    {
      id: 'test',
      name: 'test',
    },
  ];
}

export async function getTanks(
  source: any,
  args: any,
  ctx: { siteService: SiteService },
  info: GraphQLResolveInfo,
) {
  return [
    {
      id: 'haha',
      name: 'test',
    },
  ];
}
