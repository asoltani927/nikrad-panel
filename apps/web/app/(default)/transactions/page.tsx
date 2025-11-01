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
      name: "محمود سلطانی",
      phone: "09133333333",
      date: "1404/08/08",
      status: "موفق",
    },
    {
      id: 2,
      transactionId: "4564561234156",
      dargah: "به پرداخت ملت",
      name: "رضا سلطانی",
      phone: "09133333333",
      date: "1404/08/08",
      status: "لغو شده",
    },
    {
      id: 3,
      transactionId: "4564561234156",
      dargah: "به پرداخت ملت",
      name: "رضا سلطانی",
      phone: "09133333333",
      date: "1404/08/08",
      status: "در انتظار پرداخت",
    },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="[&_th]:text-right">
          <TableRow>
            <TableHead>شناسه تراکنش</TableHead>
            <TableHead>درگاه پرداخت</TableHead>
            <TableHead>کاربر</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>وضعیت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionsData.length > 0 ? (
            transactionsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.transactionId}</TableCell>
                <TableCell>{item.dargah}</TableCell>
                <TableCell className="grid gap-1">
                  <span>{item.name}</span>
                  <span className="text-xs text-gray-500">{item.phone}</span>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      item.status === "موفق"
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
  );
}
