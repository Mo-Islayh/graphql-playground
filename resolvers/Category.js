exports.Category = {
  products: ({ id: categoryId }, { filter }, { db }) => {
    const { products, reviews } = db

    let filterdProducts = products.filter(
      (item) => item.categoryId === categoryId
    )

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

      if (avgRating > 0 && avgRating < 6) {
        filterdProducts = filterdProducts.filter((product) => {
          let sumRating = 0
          let numberOfReviews = 0
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOfReviews++
            }
          })
          const avgProductRating = sumRating / numberOfReviews
          console.log(avgProductRating)
          return avgProductRating >= avgRating
        })
      }
    }

    return filterdProducts
  },
}
