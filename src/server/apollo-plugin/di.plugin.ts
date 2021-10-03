import {
  GraphQLRequestContext,
  GraphQLRequestContextDidResolveOperation,
} from 'apollo-server-types';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base/src/index';
import { BaseContext } from 'koa';
import { FieldNode, SelectionSetNode } from 'graphql/language/ast';
import { resolversInjections } from 'resolvers/index';

export class DIApolloPlugin<T extends BaseContext>
  implements ApolloServerPlugin<T>
{
  async requestDidStart?(
    apolloContext: GraphQLRequestContext,
  ): Promise<GraphQLRequestListener> {
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
