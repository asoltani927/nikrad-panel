"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  publishFee: number;
  isPublished: boolean;
};

export default function PublishProductPage() {
  const [product, setProduct] = useState<Product | null>({
    id: "123",
    title: "محصول نمونه",
    description: "این یک محصول تستی برای نمایش است.",
    price: 100000,
    image: "/img/sellers/gallery1.png",
    publishFee: 10000,
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "paying" | "paid" | "publishing" | "published"
  >("idle");

  // دریافت محصول
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch("/api/products/123");
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, []);

  // پرداخت
  async function handlePayment() {
    if (!product) return;

    setPaymentLoading(true);
    setStatus("paying");

    try {
      const res = await fetch("/api/payments/create-session", {
        method: "POST",
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const { checkoutUrl } = await res.json();

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setStatus("idle");
    } finally {
      setPaymentLoading(false);
    }
  }

  // انتشار محصول
  async function publishProduct() {
    if (!product) return;

    setStatus("publishing");

    await fetch(`/api/products/${product.id}/publish`, {
      method: "POST",
    });

    setStatus("published");
  }

  if (loading)
    return <div className="p-10 text-center">در حال بارگذاری...</div>;

  if (!product)
    return <div className="text-center">محصول یافت نشد</div>;

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6 text-right">
      <h1 className="text-2xl font-bold mb-6">
        انتشار محصول
      </h1>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">

          {/* تصویر محصول */}
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full h-80 object-cover"
          />

          {/* اطلاعات محصول */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {product.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                {product.description}
              </p>

              <div className="mt-6 space-y-2">
                <p>
                  قیمت محصول:
                  <span className="font-semibold mr-2">
                    {product.price} تومان
                  </span>
                </p>

                <p>
                  هزینه انتشار:
                  <span className="font-semibold mr-2 text-green-600">
                    {product.publishFee} تومان
                  </span>
                </p>
              </div>
            </div>

            {/* عملیات */}
            <div className="mt-8 space-y-3">
              {status === "idle" && (
                <Button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="w-full"
                >
                  پرداخت و انتشار
                </Button>
              )}

              {status === "paying" && (
                <Button disabled className="w-full">
                  انتقال به درگاه پرداخت...
                </Button>
              )}

              {status === "paid" && (
                <Button
                  onClick={publishProduct}
                  className="w-full"
                >
                  انتشار محصول
                </Button>
              )}

              {status === "publishing" && (
                <Button disabled className="w-full">
                  در حال انتشار...
                </Button>
              )}

              {status === "published" && (
                <div className="text-green-600 font-semibold text-center">
                  ✅ محصول با موفقیت منتشر شد
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}