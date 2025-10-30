"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  User,
  Phone,
  MapPin,
  FileText,
  FileImage,
  FileDown,
  Calendar,
  Info,
  UserCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface OwnershipDocsCardProps {
  ownership: {
    ownerName: string;
    ownerPhone: string;
    ownerAddress: string;
    engineer: string;
    licenseNumber: string;
    licenseDate: string;
    licenseFile: string;
    technicalDocs: string[];
    description?: string;
  };
}

export function OwnershipDocsCard({ ownership }: OwnershipDocsCardProps) {
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const isPdf = (url: string) => url.endsWith(".pdf");

  return (
    <>
      <Card className="shadow-sm border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            مالکیت و مدارک پروژه
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="font-medium">مالک / شرکت مالک:</span>
            <span>{ownership.ownerName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            <span className="font-medium">شماره تماس:</span>
            <span>{ownership.ownerPhone}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="font-medium">آدرس دفتر مالک:</span>
            <span>{ownership.ownerAddress}</span>
          </div>

          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-blue-600" />
            <span className="font-medium">مهندس ناظر / طراح:</span>
            <span>{ownership.engineer}</span>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="font-medium">شماره پروانه ساخت:</span>
            <span>{ownership.licenseNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="font-medium">تاریخ صدور پروانه:</span>
            <span>{ownership.licenseDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <FileDown className="h-4 w-4 text-blue-600" />
            <span className="flex items-center gap-2 font-medium">
              فایل پروانه ساخت:
            </span>
            <a href={ownership.licenseFile} download className="text-blue-700">
              دانلود PDF
            </a>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <span className="flex items-center gap-2 font-medium">
              <FileImage className="h-4 w-4 text-blue-600" />
              فایل نقشه‌ها و مدارک فنی:
            </span>
            <div className="grid lg:grid-cols-12 grid-cols-6 gap-2">
              {ownership.technicalDocs.map((doc, i) => (
                <Image
                  height={10}
                  width={10}
                  key={i}
                  src={doc}
                  alt={`Doc ${i + 1}`}
                  onClick={() => setPreviewFile(doc)}
                  className="object-cover  w-full rounded-lg cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>

          {ownership.description && (
            <div className="flex items-start gap-2 md:col-span-2">
              <Info className="h-4 w-4 text-blue-600 mt-1" />
              <div>
                <span className="font-medium block mb-1">توضیحات نهایی:</span>
                <p className="text-gray-600 leading-relaxed">
                  {ownership.description}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>پیش‌نمایش فایل</DialogTitle>
          </DialogHeader>
          {previewFile && (
            <Image
              height={32}
              width={32}
              src={previewFile}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
