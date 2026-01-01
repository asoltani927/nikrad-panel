import { gql } from 'graphql-request'

export const CREATE_PRODUCT_MUTATION = gql`
mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    id
    name
    slug
    price
    stock
  }
}
`
