export function generateProductLink(product: { id: string, slug: string }) {
  return `/products/${product.slug}`;
}