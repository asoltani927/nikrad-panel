export interface inquiryType {
    id: number;
    title: string;
    quantity: string;
    location: {
        province: string;
        city: string;
    };
    priority: "فوری" | "عادی" | "غیرفوری";
    deliveryDeadline: string;
    offersCount: number;
    inquiryLink: string;
}
