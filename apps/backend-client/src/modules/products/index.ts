import { FastifyInstance } from 'fastify'
import { postProductRoute } from './routes/post-product.route'
import { getProductsRoute } from './routes/get-products.route'
import { getProductByIdRoute } from './routes/get-product.route'
import { getProductBySellerIdRoute } from './routes/get-products-seller.route'
import { putProductRoute } from './routes/put-product.route'
import { deleteProductRoute } from './routes/delete-product.route'

export async function productsModule(app: FastifyInstance) {
  app.register(
    async (productsApp) => {
      productsApp.register(postProductRoute)
      productsApp.register(getProductsRoute)
      productsApp.register(getProductByIdRoute)
      productsApp.register(getProductBySellerIdRoute)
      productsApp.register(putProductRoute)
      productsApp.register(deleteProductRoute)
    },
    { prefix: '/products' },
  )
}

/**
 * TASKS: @reza
 * @description: we can use redis to store those data for 24 hours and update them every 24 hours to reduce the load on the database and improve the performance of the home page (we can use a cron job to update the data every 24 hours) 
 * 1. Create a public route to fetch new products for the home page, sorted by newest first (just fetch 10 items sorted by createdAt descending)
 * 2. Create a public route to fetch expensive products for the home page, sorted by price descending (just fetch 10 items sorted by price descending)
 * 3. Create a public route to fetch cheaper products for the home page, sorted by price ascending (just fetch 10 items sorted by price ascending)
 * 4. Create a public route to fetch top-viewed free products for the home page, sorted by views descending (just fetch 10 items sorted by views descending)
 * 5. Create a public route to fetch top-selling products for the home page, sorted by total sales descending (just fetch 10 items sorted by total sales descending)
 */