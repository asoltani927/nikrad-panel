"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Receipt,
  FileText,
  Calendar,
  CircleDollarSign,
  CheckCircle,
} from "lucide-react";

interface NotebookTypeCardProps {
  notebook: {
    type: string;
    transactionId: string;
    transactionStatus: string;
    transactionDate: string;
    transactionAmount: number;
  };
}

export function NotebookTypeCard({ notebook }: NotebookTypeCardProps) {
  return (
    <Card className="shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          نوع دفترچه و جزئیات تراکنش
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4 text-blue-600" />
          <span className="font-medium">مدل دفترچه:</span>
          <span>{notebook.type}</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="font-medium">شماره تراکنش:</span>
          <span>{notebook.transactionId}</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <span className="font-medium">وضعیت تراکنش:</span>
          <span>{notebook.transactionStatus}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="font-medium">تاریخ تراکنش:</span>
          <span>{notebook.transactionDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-4 w-4 text-blue-600" />
          <span className="font-medium">مبلغ تراکنش:</span>
          <span>{notebook.transactionAmount.toLocaleString()} تومان</span>
        </div>
      </CardContent>
    </Card>
  );
}
