import BaseContainer from "@/components/base/BaseContainer";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Transactions() {
  const transactionsData = [
    {
      id: 1,
      transactionId: "4564561234156",
      dargah: "به پرداخت ملت",
      date: "1404/08/08",
      status: "موفق",
    },
    {
      id: 2,
      transactionId: "4564561234156",
      dargah: "به پرداخت ملت",
      date: "1404/08/08",
      status: "لغو شده",
    },
    {
      id: 3,
      transactionId: "4564561234156",
      dargah: "به پرداخت ملت",
      date: "1404/08/08",
      status: "در انتظار پرداخت",
    },
  ];

  return (
    <div>
      {/* title  */}
      <div className="bg-gray-100 py-4 mb-10 text-sm font-medium">
        <BaseContainer className="px-6 lg:px-16">
          تراکنش ها
        </BaseContainer>
      </div>
      <BaseContainer className="px-6 lg:px-16">

        {/* filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full flex flex-col sm:grid grid-cols-3 lg:grid-cols-6 sm:items-center gap-2">
            <div className=" flex flex-col gap-2 table-filters-style">
              <Label htmlFor="status" className="text-gray-500 text-xs ">وضعیت </Label>
              <Select dir="rtl">
                <SelectTrigger id="status" className="h-8! w-full">
                  <SelectValue placeholder="انتخاب وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">موفق</SelectItem>
                  <SelectItem value="failed">لغو شده</SelectItem>
                  <SelectItem value="pending">در انتظار پرداخت</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 table-filters-style">
              <Label htmlFor="status" className="text-gray-500 text-xs ">تاریخ </Label>
              <Select dir="rtl">
                <SelectTrigger id="status" className="h-8! w-full">
                  <SelectValue placeholder="انتخاب وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">موفق</SelectItem>
                  <SelectItem value="failed">لغو شده</SelectItem>
                  <SelectItem value="pending">در انتظار پرداخت</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 table-filters-style">
              <Label htmlFor="transactionId" className="text-gray-500 text-xs ">شناسه </Label>
              <Input
                id="transactionId"
                placeholder="مثلاً 456456123"
                className="h-8! w-full"
              />
            </div>
          </div>
        </div>


        {/* table  */}
        <div className=" rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="[&_th]:text-right">
              <TableRow>
                <TableHead className="text-gray-500">شناسه تراکنش</TableHead>
                <TableHead className="text-gray-500">درگاه پرداخت</TableHead>
                <TableHead className="text-gray-500">نوع تراکنش</TableHead>
                <TableHead className="text-gray-500">تاریخ</TableHead>
                <TableHead className="text-gray-500">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.length > 0 ? (
                transactionsData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.transactionId}</TableCell>
                    <TableCell>{item.dargah}</TableCell>
                    <TableCell className="grid gap-1">
                      <span >واریز</span>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-lg text-sm ${item.status === "موفق"
                          ? "bg-green-100 text-green-700"
                          : item.status === "لغو شده"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    موردی یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </BaseContainer>
    </div>

  );
}
