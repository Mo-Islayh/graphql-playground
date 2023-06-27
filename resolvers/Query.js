exports.Query = {
  hello: () => "Hello World",
  products: (parent, { filter }, { db }) => {
    const { products, reviews } = db
    let filterdProducts = products

    if (filter) {
      const { onSale, avgRating } = filter
      if (onSale === true) {
        filterdProducts = filterdProducts.filter((item) => {
          return item.onSale
        })
      }
      if (onSale === false) {
        filterdProducts = filterdProducts.filter((item) => {
          return !item.onSale
        })
      }
      // avgRating > 0 && avgRating < 6
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filterdProducts = filterdProducts.filter((product) => {
          let sumRating = 0
          let numberOfReviews = 0
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOfReviews++
            }
          })

          const avgProductRaring = sumRating / numberOfReviews
          return avgProductRaring >= avgRating
        })
      }
    }

    return filterdProducts
  },
  product: (parent, { id: productId }, { db }) => {
    return db.products.find((item) => item.id === productId)
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id: categorieId }, { db }) => {
    return db.categories.find((item) => item.id === categorieId)
  },
  reviews: (parent, args, { db }) => db.reviews,
}
