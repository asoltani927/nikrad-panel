export const CREATE_PRODUCT_MUTATION = `
mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    id
    name
    price
  }
}
`
