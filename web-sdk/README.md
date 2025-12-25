import { GraphQLClient } from "graphql-request";
import { createProductsSdk } from "@/sdk/products-sdk";

async function main() {
  // 1️⃣ Initialize GraphQL client
  const client = new GraphQLClient("https://api.example.com/graphql", {
    headers: {
      Authorization: `Bearer YOUR_API_TOKEN`,
    },
  });

  // 2️⃣ Create the Products SDK
  const productsSdk = createProductsSdk(client);

  // 3️⃣ Create a new product
  const newProduct = await productsSdk.create({
    input: {
      name: "Sample Product",
      price: 19.99,
      description: "This is a sample product",
    },
  });
  console.log("Created Product:", newProduct.createProduct);

  // 4️⃣ Update the product
  const updatedProduct = await productsSdk.update({
    id: newProduct.createProduct.id,
    input: {
      price: 24.99,
    },
  });
  console.log("Updated Product Price:", updatedProduct.updateProduct.price);

  // 5️⃣ Fetch products (paginated)
  const paginated = await productsSdk.list({ page: 1, limit: 10 });
  console.log("Paginated Products:", paginated.paginatedProducts.items);

  // 6️⃣ Fetch products (infinite)
  const allProducts = await productsSdk.fetchAll({ cursor: null, limit: 5 });
  console.log("All Products via Infinite Fetch:", allProducts);

  // 7️⃣ Delete the product
  await productsSdk.delete({ id: newProduct.createProduct.id });
  console.log("Product deleted!");
}

main().catch(console.error);
