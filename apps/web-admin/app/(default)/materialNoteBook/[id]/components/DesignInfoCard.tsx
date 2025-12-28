"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Layout, Paintbrush, TreePine, ClipboardList, Info } from "lucide-react";

interface DesignInfoCardProps {
  design: {
    hasEngineeringMap: boolean;
    hasInteriorDesign: boolean;
    hasFacadeDesign: boolean;
    hasLandscapeDesign: boolean;
    planStatus: string;
    description?: string;
  };
}

export function DesignInfoCard({ design }: DesignInfoCardProps) {
  return (
    <Card className="shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">طراحی و مستندات پروژه</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="font-medium">دارای نقشه نظام مهندسی:</span>
          <span>{design.hasEngineeringMap ? "بله" : "خیر"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-blue-600" />
          <span className="font-medium">دارای طراحی داخلی:</span>
          <span>{design.hasInteriorDesign ? "بله" : "خیر"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Paintbrush className="h-4 w-4 text-blue-600" />
          <span className="font-medium">دارای طراحی نما:</span>
          <span>{design.hasFacadeDesign ? "بله" : "خیر"}</span>
        </div>

        <div className="flex items-center gap-2">
          <TreePine className="h-4 w-4 text-blue-600" />
          <span className="font-medium">دارای طراحی محوطه‌سازی:</span>
          <span>{design.hasLandscapeDesign ? "بله" : "خیر"}</span>
        </div>

        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-blue-600" />
          <span className="font-medium">وضعیت نقشه‌های اجرایی:</span>
          <span>{design.planStatus}</span>
        </div>

        {design.description && (
          <div className="flex items-start gap-2 md:col-span-2">
            <Info className="h-4 w-4 text-blue-600 mt-1" />
            <div>
              <span className="font-medium block mb-1">توضیحات تکمیلی طراحی:</span>
              <p className="text-gray-600 leading-relaxed">{design.description}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
