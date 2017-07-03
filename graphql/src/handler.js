import { makeExecutableSchema } from 'graphql-tools'
import { graphqlLambda, graphiqlLambda } from 'graphql-server-lambda'
import typeDefs from './schema'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export const graphqlHandler = graphqlLambda((event, context) => {
  const headers = event.headers
  const functionName = context.functionName

  return {
    schema,
    context: {
      headers,
      functionName,
      event,
      context,
    },
  }
})
export const graphiqlHandler = graphiqlLambda({
  endpointURL: '/graphql',
})

/*
✏️ Generate API code or type annotations based on a GraphQL schema and query documents
https://github.com/apollographql/apollo-codegen
https://dev-blog.apollodata.com/graphql-dx-d35bcf51c943

*/
