const Path = require('path')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { ApolloServer } = require('apollo-server')

// resolver indexes
const images = require('./images')

// generate the GraphQL schema document node
const typesArray = loadFilesSync(Path.resolve(__dirname), {
  extensions: ['graphql'],
  ignoredExtensions: ['js'],
  ignoreIndex: true,
  recursive: true
})
const typeDefs = mergeTypeDefs(typesArray, {
  commentDescriptions: true // https://www.graphql-tools.com/docs/api/interfaces/merge_src.config/#commentdescriptions
})

const resolvers = {
  Query: {
    ...images.Query
  },
  // Mutation: {
  //   ...images.Mutation
  // }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.info(`🚀  Apollo is ready at ${url}`);
})
