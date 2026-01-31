import BaseContainer from "@/components/base/BaseContainer";
import { Button } from "@/components/ui/button";
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
export default function Received() {
  const transactionsData = [
    {
      id: 1,
      offerId: "343ew",
      title: "خرید تیرآهن",
      owner: "هانا",
      createAt: '1404/08/08',
      amount: 200,
      price: 2000,
      status: "pending",
    },
    {
      id: 2,
      offerId: "343ew",
      title: "خرید تیرآهن",
      owner: "هانا",
      createAt: '1404/08/08',
      amount: 200,
      price: 2000,
      status: "rejected",
    },
    {
      id: 2,
      offerId: "343ew",
      title: "خرید تیرآهن",
      owner: "هانا",
      createAt: '1404/08/08',
      amount: 200,
      price: 2000,
      status: "accepted",
    },

  ];

  return (
    <div>
      {/* title  */}
      <div className="bg-gray-100 py-4 mb-10 text-sm font-medium">
        <BaseContainer className="px-6 lg:px-16">
          پیشنهادهای دریافتی
        </BaseContainer>
      </div>
      <BaseContainer className="px-6 lg:px-16">

        {/* filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full flex flex-col sm:grid grid-cols-3 lg:grid-cols-6 sm:items-center gap-4">


            <div className="w-full flex flex-col gap-2 table-filters-style">
              <Label htmlFor="transactionId" className="text-gray-500 text-xs ">شناسه </Label>
              <Input
                id="transactionId"
                placeholder="مثلاً 456456123"
                className="h-8! w-full"
              />
            </div>

            <div className="w-full flex flex-col gap-2 table-filters-style">
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

            <div className="w-full flex flex-col gap-2 table-filters-style">
              <Label htmlFor="status" className="text-gray-500 text-xs ">دسته بندی </Label>
              <Select dir="rtl">
                <SelectTrigger id="status" className="h-8! w-full">
                  <SelectValue placeholder="انتخاب وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">دسته بندی 1</SelectItem>
                  <SelectItem value="failed"> دسته بندی 2</SelectItem>
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

          </div>
        </div>


        {/* table  */}
        <div className=" rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="[&_th]:text-right">
              <TableRow>
                <TableHead className="text-gray-500">شناسه </TableHead>
                <TableHead className="text-gray-500">عنوان</TableHead>
                <TableHead className="text-gray-500">پیشنهاد دهنده</TableHead>
                <TableHead className="text-gray-500">مقدار</TableHead>
                <TableHead className="text-gray-500">قیمت</TableHead>
                <TableHead className="text-gray-500">وضعیت</TableHead>
                <TableHead className="text-gray-500">تاریخ</TableHead>
                <TableHead className="text-gray-500">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.length > 0 ? (
                transactionsData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.offerId}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-lg text-sm ${item.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {
                          item.status === 'accepted' ? 'پذیرفته شده' :
                            item.status === 'rejected' ? 'رد شده' :
                              'در حال انتظار'}
                      </span>
                    </TableCell>
                    <TableCell>{item.createAt}</TableCell>
                    <TableCell className="flex items-center text-sm text-yellow-600 cursor-pointer">
                      <Button variant={"ghost"} className="cursor-pointer h-7  text-yellow-600" >جزئیات</Button>
                      <Button variant={"ghost"} className="cursor-pointer h-7  text-green-600  ">تأیید</Button>
                      <Button variant={"ghost"} className="cursor-pointer h-7  text-red-600 ">رد کردن</Button>
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
