import { z } from "zod";

/* ---------------- SCALARS ---------------- */
const Float = z.number();
const ID = z.string();
const DateTime = z.string(); // assuming ISO string, can transform to Date if needed

/* ---------------- CUSTOMER ADDRESS (nullable) ---------------- */
const CustomerAddressSchema = z.object({
  id: ID,
  street: z.string().nullable(),
  city: z.string().nullable(),
  // add more fields if your CustomerAddress has them
}).partial(); // make fields optional if they can be null

/* ---------------- SELLER (nullable) ---------------- */
const SellerSchema = z.object({
  id: ID,
  name: z.string().nullable(),
  // add more fields if needed
}).partial();

/* ---------------- PRODUCT VARIANT ---------------- */
const ProductVariantSchema = z.object({
  id: ID,
  name: z.string().nullable(),
  // add more fields if needed
}).partial();

/* ---------------- PRODUCT ---------------- */
const ProductSchema = z.object({
  id: ID,
  name: z.string().nullable(),
  price: Float.nullable(),
  // add more fields if needed
}).partial();

/* ---------------- CART ITEM ---------------- */
export const CartItemSchema = z.object({
  __typename: z.literal("CartItem").optional(),
  address: CustomerAddressSchema.nullable().optional(),
  amount: Float,
  createdAt: DateTime,
  discountValue: Float,
  id: ID,
  product: ProductSchema,
  quantity: Float,
  seller: SellerSchema.nullable().optional(),
  shippingCost: Float,
  taxAmount: Float,
  totalAmount: Float,
  updatedAt: DateTime,
  variants: z.array(ProductVariantSchema),
});

/* ---------------- CART ---------------- */
export const CartSchema = z.object({
  __typename: z.literal("Cart").optional(),
  address: CustomerAddressSchema.nullable().optional(),
  amount: Float,
  items: z.array(CartItemSchema),
  shippingCost: Float,
  taxAmount: Float,
  totalAmount: Float,
});

/* ---------------- RESPONSE SCHEMA ---------------- */
export const GetCartResponseSchema = z.object({
  cart: CartSchema.nullable(),
});

/* ---------------- TYPES ---------------- */
export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type GetCartResponse = z.infer<typeof GetCartResponseSchema>;