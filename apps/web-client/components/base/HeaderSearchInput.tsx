'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { generateProductLink } from '@/utils/generate-product-link.util';
import { generateSellerLink } from '@/utils/generate-seller-link.util';

// داده‌های نمونه
const mockProducts = [
  { id: 'p1', name: 'لپ‌تاپ', slug: 'laptop' },
  { id: 'p2', name: 'گوشی هوشمند', slug: 'smartphone' },
  { id: 'p3', name: 'هدفون', slug: 'headphones' },
  { id: 'p4', name: 'کیبورد', slug: 'keyboard' },
];

const mockSellers = [
  { id: 's1', name: 'فروشگاه تکنولوژی', slug: 'tech-store' },
  { id: 's2', name: 'گجت هاب', slug: 'gadget-hub' },
  { id: 's3', name: 'الکترومارت', slug: 'electro-mart' },
];

interface BaseHeaderSearchInputProps {
  trigger: React.ReactNode;
}

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface Seller {
  id: string;
  name: string;
  slug: string;
}

export default function BaseHeaderSearchInput({ trigger }: BaseHeaderSearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  // تشخیص موبایل
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 568 : false;

  // فیلتر کردن داده‌ها
  const filteredProducts = mockProducts.filter((p: Product) =>
    p.name.includes(query),
  );

  const filteredSellers = mockSellers.filter((s: Seller) =>
    s.name.includes(query),
  );

  const openDialog = () => setOpen(true);

  return (
    <>
      {isMobile ? (
        <Button asChild variant={'ghost'} onClick={openDialog}>
          {trigger}
        </Button>
      ) : (
        <Input
          type="text"
          value={query}
          onFocus={openDialog}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی محصول یا فروشنده"
          className="w-full"
        />
      )}

      <CommandDialog open={open} onOpenChange={setOpen} modal title="جستجو">
        <CommandInput
          value={query}
          onChangeCapture={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="محصول یا فروشنده را جستجو کنید..."
          className="pr-8"
        />

        <CommandEmpty>نتیجه‌ای یافت نشد.</CommandEmpty>

        <div className="max-h-[400px] overflow-y-auto">
          <CommandGroup heading="محصولات">
            {filteredProducts.map((product: Product) => (
              <CommandItem
                key={product.id}
                onSelect={() => {
                  router.push(generateProductLink({ id: product.id, slug: product.slug }));
                  setOpen(false);
                }}
              >
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="فروشندگان">
            {filteredSellers.map((seller: Seller) => (
              <CommandItem
                key={seller.id}
                onSelect={() => {
                  router.push(generateSellerLink({ id: seller.id, slug: seller.slug }));
                  setOpen(false);
                }}
              >
                {seller.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </div>
      </CommandDialog>
    </>
  );
}
