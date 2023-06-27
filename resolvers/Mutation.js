const { v4: uuid } = require("uuid")
exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input
    const newCategory = {
      id: uuid(),
      name,
    }
    db.categories.push(newCategory)
    return newCategory
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, onSale, image, categoryId } =
      input
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      onSale,
      image,
      categoryId,
    }
    db.products.push(newProduct)
    return newProduct
  },
  addReview: (parent, { input }, { db }) => {
    const { title, comment, rating, productId } = input
    const newReview = {
      id: uuid(),
      date: new Date().getTime(),
      title,
      comment,
      rating,
      productId,
    }
    db.reviews.push(newReview)
    return newReview
  },
  deleteCategory: (parent, { id }, { db }) => {
    let isIdThere = false
    db.categories.forEach((category) => {
      if (category.id === id) {
        isIdThere = true
      }
    })

    db.categories = db.categories.filter((category) => category.id !== id)

    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        product.categoryId = null
      }
      return product
    })

    return isIdThere
  },
  deleteProduct: (parent, { id }, { db }) => {
    let isIdThere = false
    db.products.forEach((product) => {
      if (product.id === id) {
        isIdThere = true
      }
    })

    db.products = db.products.filter((product) => product.id !== id)

    db.reviews = db.reviews.filter((review) => review.productId !== id)

    return isIdThere
  },
  deleteReview: (parent, { id }, { db }) => {
    let isIdThere = false
    db.products.forEach((product) => {
      if (product.id === id) {
        isIdThere = true
      }
    })

    db.reviews = db.reviews.filter((review) => review.id !== id)

    return isIdThere
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const { name } = input

    db.categories = db.categories.map((category) => {
      if (category.id === id) {
        category.name = name
      }
      return category
    })

    return db.categories.find((category) => category.id === id)
  },
  updateProduct: (parent, { id, input }, { db }) => {
    db.products = db.products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          ...input,
        }
      }

      return product
    })

    return db.products.find((product) => product.id === id)
  },
  updateReview: (parent, { id, input }, { db }) => {
    db.reviews = db.reviews.map((review) => {
      if (review.id === id) {
        return {
          ...review,
          ...input,
        }
      }
      return review
    })

    return db.reviews.find((review) => review.id === id)
  },
}
