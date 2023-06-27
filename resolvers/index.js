const { Query } = require("./Query")
const { Category } = require("./Category")
const { Mutation } = require("./Mutation")
const { Product } = require("./Product")

exports.resolvers = {
  Query,
  Category,
  Product,
  Mutation,
}
