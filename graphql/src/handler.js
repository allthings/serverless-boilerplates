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

samples: https://github.com/apollographql/launchpad
some reasons why i like gql and would pick it over REST/CRUD:
- avoid overfetching
- tools like apollo-client have built in caching solutions
- support for query subscriptions—no need to come up with or use some additional websocket data-exchange format
- very enjoyable to develop
- easy to set up in lambda, koa, express
- automatic documentation via the introspection (especially if you provide field description in schema)
  - yea yea yea but but swagger... yea.. it's not the same.
- very enjoyable to develop against, e.g. in react, or even standalone
- tools exist to easily query gql apis outside of a react app, server side
- the introspection lets you generate an SDK. perfect for a developer platform.
- the introspection lets you generate type definitions for use in code (e.g. TypeScript, or Golang)
- if you enjoy writing SQL queries, GQL will also be enjoyable
- quick api iteration, support for @deprecated fields
- easy code separation/organisation
- easily express and query complex data structures
- with the introspection, it's possible to visualise a graphql api
- if you're skeptical, please, give it 5 minutes. ( https://signalvnoise.com/posts/3124-give-it-five-minutes )

*/
