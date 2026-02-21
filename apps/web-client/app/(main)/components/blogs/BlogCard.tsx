"use client";

import { Blog } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ArrowUpLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div
      dir="rtl"
      className="min-w-[291px] w-[291px] max-w-[291px] text-[#333741] bg-transparent rounded-lg  overflow-hidden shrink-0"
    >
      <div className=" rounded-[12px] bg-white ">
        <Image
          src={blog.image}
          alt={blog.title}
          width={291}
          height={291}
          className=" rounded-[12px]  object-cover "
        />
      </div>

      <div className=" flex flex-col gap-2 pt-4">
        <div className="flex justify-start items-center gap-1 text-[#CA8504] text-xs">
          <span>{blog.publishedAt}</span>
          <span className="w-1 h-1 aspect-ratio rounded-full bg-[#CA8504]"></span>
          <span>زمان مطالعه {blog.readingTime}</span>
        </div>

        <div className="flex items-start gap-4 justify-between h-[51px]">
          <h3 className="text-[#1F242F] font-medium text-[17px]">
            {blog.title.length > 55
              ? blog.title.substr(0, 55) + "..."
              : blog.title}
          </h3>
          <Link href={blog.slug}>
            <ArrowUpLeft size={18} />
          </Link>
        </div>

        <p className="text-[#61646C] text-xs  h-8 line-clamp-3">
          {blog.excerpt.length > 100
            ? blog.excerpt.substr(0, 100) + "..."
            : blog.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {blog.categories.map((cat) => (
            <Badge
              key={cat.id}
              className="bg-[#FEF6EE] border-[#F9DBAF] text-[#B93815] text-xs"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
