const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const express = require("express")
const http = require("http")
const { db } = require("./db")

const { typeDefs } = require("./Schema")
const { resolvers } = require("./resolvers")

//  String, Int, Float, Boolean

async function startApolloServer() {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: { db },
  })

  await server.start()

  server.applyMiddleware({ app })

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
