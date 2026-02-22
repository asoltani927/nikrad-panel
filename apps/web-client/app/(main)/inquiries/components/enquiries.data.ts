import { inquiryType } from "./typings/inquiry.types";

export const inquiries: inquiryType[] = [
    {
        id: 1,
        title: "خرید تیرآهن ۱۴",
        quantity: "8 تن",
        location: {
            province: "تهران",
            city: "ری",
        },
        priority: "فوری",
        deliveryDeadline: "تا 8 روز",
        offersCount: 15,
        inquiryLink: "/inquiries/1",
    },
    {
        id: 2,
        title: "نیاز به ورق گالوانیزه",
        quantity: "5 تن",
        location: {
            province: "اصفهان",
            city: "اصفهان",
        },
        priority: "عادی",
        deliveryDeadline: "تا 12 روز",
        offersCount: 9,
        inquiryLink: "/inquiries/2",
    },
    {
        id: 3,
        title: "درخواست میلگرد 16",
        quantity: "20 تن",
        location: {
            province: "خراسان رضوی",
            city: "مشهد",
        },
        priority: "فوری",
        deliveryDeadline: "تا 5 روز",
        offersCount: 21,
        inquiryLink: "/inquiries/3",
    },
    {
        id: 4,
        title: "خرید پروفیل صنعتی",
        quantity: "12 تن",
        location: {
            province: "آذربایجان شرقی",
            city: "تبریز",
        },
        priority: "غیرفوری",
        deliveryDeadline: "تا 20 روز",
        offersCount: 6,
        inquiryLink: "/inquiries/4",
    },
];
