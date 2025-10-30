"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Ruler, Layers, Home, Calendar, Hammer } from "lucide-react";

interface ProjectInfoCardProps {
  project: {
    name: string;
    location: string;
    area: number;
    builtArea: number;
    floors: number;
    units: number;
    usage: string;
    startYear: number;
    status: string;
  };
}

export function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  return (
    <Card className="shadow-sm border rounded-2xl mt-5">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">مشخصات کلی پروژه</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-600" />
          <span className="font-medium">نام پروژه:</span>
          <span>{project.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="font-medium">موقعیت:</span>
          <span>{project.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-blue-600" />
          <span className="font-medium">متراژ عرصه:</span>
          <span>{project.area.toLocaleString()} متر مربع</span>
        </div>

        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <span className="font-medium">متراژ زیربنا:</span>
          <span>{project.builtArea.toLocaleString()} متر مربع</span>
        </div>

        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-blue-600" />
          <span className="font-medium">تعداد طبقات:</span>
          <span>{project.floors}</span>
        </div>

        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-blue-600" />
          <span className="font-medium">تعداد واحدها:</span>
          <span>{project.units}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-600" />
          <span className="font-medium">کاربری ساختمان:</span>
          <span>{project.usage}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="font-medium">سال شروع پروژه:</span>
          <span>{project.startYear}</span>
        </div>

        <div className="flex items-center gap-2">
          <Hammer className="h-4 w-4 text-blue-600" />
          <span className="font-medium">وضعیت فعلی:</span>
          <span>{project.status}</span>
        </div>
      </CardContent>
    </Card>
  );
}
