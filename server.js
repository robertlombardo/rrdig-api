'use strict'

require('promise-throw')
require('dotenv').config()

const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')
const Path = require('path')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')

// resolver indexes
const images = require('./lib/graphql/images')

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
  Mutation: {
    ...images.Mutation
  },
  Upload: GraphQLUpload
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await server.start()

  const app = express()
  app.use(graphqlUploadExpress())
  server.applyMiddleware({ app })

  const port = process.env.PORT || 8080
  await new Promise(r => app.listen({ port }, r))

  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}
startServer()
