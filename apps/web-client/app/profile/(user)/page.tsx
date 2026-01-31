"use client";

import BaseContainer from "@/components/base/BaseContainer";
import { Sparkle, Star, Users, CircleStar } from "lucide-react";
import StatCard from "./components/StatCard";
import LastOrders from "./components/LastOrders";

export default function ProfileDashboardPage() {
  const stats = [
    {
      id: 1,
      title: "سفارشات",
      value: 32000,
      icon: Sparkle,
      change: -34,
    },
    {
      id: 2,
      title: "درآمد",
      value: "12,400,000",
      icon: Star,
      change: 12,
    },
    {
      id: 3,
      title: "لغو شده",
      value: 120,
      icon: Users,
      change: -8,
    },
    {
      id: 4,
      title: "لغو شده",
      value: 120,
      icon: Users,
      change: -8,
    },
    {
      id: 5,
      title: "لغو شده",
      value: 120,
      icon: Users,
      change: -8,
    },
    {
      id: 6,
      title: "لغو شده",
      value: 120,
      icon: CircleStar,
      change: +8,
    },
  ];

  return (
    <BaseContainer className="px-6 lg:px-16 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {stats.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            change={item.change}
          />
        ))}
      </div>

      <div className="text-base text-black font-medium mt-10 mb-4">
        آخرین سفارشات
      </div>
      <LastOrders />
    </BaseContainer>
  );
}
