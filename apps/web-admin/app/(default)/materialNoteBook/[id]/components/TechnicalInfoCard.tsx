import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wrench, Building2, Layers, Hammer, Plug, Cog, Zap, Cpu, DollarSign } from "lucide-react";

interface TechnicalInfoCardProps {
  technical: {
    structureType: string;
    roofType: string;
    foundationType: string;
    wallMaterial: string;
    mechanicalSystem: string;
    electricalSystem: string;
    smartSystem: boolean;
    costPerMeter: number;
  };
}

export function TechnicalInfoCard({ technical }: TechnicalInfoCardProps) {
  return (
    <Card className="shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">مشخصات فنی و سازه‌ای</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-600" />
          <span className="font-medium">نوع اسکلت سازه:</span>
          <span>{technical.structureType}</span>
        </div>

        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <span className="font-medium">نوع سقف:</span>
          <span>{technical.roofType}</span>
        </div>

        <div className="flex items-center gap-2">
          <Hammer className="h-4 w-4 text-blue-600" />
          <span className="font-medium">نوع فونداسیون:</span>
          <span>{technical.foundationType}</span>
        </div>

        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-blue-600" />
          <span className="font-medium">نوع مصالح بدنه:</span>
          <span>{technical.wallMaterial}</span>
        </div>

        <div className="flex items-center gap-2">
          <Cog className="h-4 w-4 text-blue-600" />
          <span className="font-medium">سیستم تأسیسات مکانیکی:</span>
          <span>{technical.mechanicalSystem}</span>
        </div>

        <div className="flex items-center gap-2">
          <Plug className="h-4 w-4 text-blue-600" />
          <span className="font-medium">سیستم تأسیسات برقی:</span>
          <span>{technical.electricalSystem}</span>
        </div>

        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-blue-600" />
          <span className="font-medium">هوشمندسازی:</span>
          <span>{technical.smartSystem ? "بله" : "خیر"}</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-600" />
          <span className="font-medium">هزینه هر متر مربع:</span>
          <span>{technical.costPerMeter.toLocaleString()} تومان</span>
        </div>
      </CardContent>
    </Card>
  );
}
