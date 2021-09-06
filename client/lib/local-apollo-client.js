import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: `http://localhost:${process.env.SERVER_PORT}/graphql`,
  cache: new InMemoryCache(),
})

export default apolloClient
