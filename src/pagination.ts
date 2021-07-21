const limit = 10
const products = require('../data/products.json')
let startIndex
let endIndex

function getProducts(page: number) {
    startIndex = (page - 1) * limit
    endIndex = (page * limit) - 1
    const resultProducts = products.slice(startIndex, endIndex)
    return resultProducts
}

module.exports = {
    getProducts
}