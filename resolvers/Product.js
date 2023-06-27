exports.Product = {
  category: ({ categoryId }, arges, { db }) => {
    return db.categories.find((item) => item.id === categoryId)
  },
  reviews: ({ id }, arges, { db }) => {
    return db.reviews.filter((item) => item.productId === id)
  },
}
