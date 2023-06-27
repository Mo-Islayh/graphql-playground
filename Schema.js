const { gql } = require("apollo-server-core")

exports.typeDefs = gql`
  type Query {
    hello: String!
    products(filter: FilterProductsInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    reviews: [Review!]!
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    updateReview(id: ID!, input: UpdateReviewInput!): Review
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    category: Category
    reviews: [Review!]
  }
  type Category {
    id: ID!
    name: String!
    products(filter: FilterProductsInput): [Product!]!
  }
  type Review {
    id: ID!
    title: String!
    date: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input FilterProductsInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    categoryId: ID!
  }
  input AddReviewInput {
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input UpdateProductInput {
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean
    image: String
    categoryId: ID
  }

  input UpdateReviewInput {
    title: String
    comment: String
    rating: Int
    productId: ID
  }
`
