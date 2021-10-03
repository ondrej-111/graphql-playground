import {
  GraphQLRequestContext,
  GraphQLRequestContextDidResolveOperation,
} from 'apollo-server-types';
// import { ApolloServerPlugin } from '/apollo-server-plugin-base/src/index';
import { BaseContext } from 'koa';
import { FieldNode, SelectionSetNode } from 'graphql/language/ast';
import { resolversInjections } from 'resolvers/index';

// TODO: error: https://github.com/apollographql/apollo-server/issues/4827
//  implement ApolloServerPlugin<T>
export class DIApolloPlugin<T extends BaseContext> {
  async requestDidStart?(
    apolloContext: GraphQLRequestContext,
    // TODO: error: https://github.com/apollographql/apollo-server/issues/4827
    //  return Promise<GraphQLRequestListener>
  ): Promise<any> {
    return {
      didResolveOperation: async (
        ctx: GraphQLRequestContextDidResolveOperation<T>,
      ) => {
        for (const r of this.parseSelectors(ctx.operation?.selectionSet)) {
          const lazyInjectResolvers = resolversInjections[r];
          if (lazyInjectResolvers) {
            for (const [key, value] of Object.entries(lazyInjectResolvers())) {
              ctx.context[key] = value;
            }
          }
        }
      },
    };
  }

  private parseSelectors(selectionSet: SelectionSetNode): string[] {
    let selectors: string[] = [];
    for (const s of selectionSet.selections) {
      selectors.push((s as FieldNode).name.value);
      if ((s as FieldNode).selectionSet) {
        selectors = [
          ...this.parseSelectors((s as FieldNode).selectionSet),
          ...selectors,
        ];
      }
    }
    return selectors;
  }
}
