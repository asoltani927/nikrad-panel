export function generateSellerLink(seller: { id: string, slug: string }) {
  return `/sellers/${seller.slug}`;
}