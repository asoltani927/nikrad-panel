"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Pen, Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { AddressFormModal } from "../components/AddressFormModal";
import { PaymentDetails } from "../components/PaymentDetails";

export default function CheckoutPage() {
    const router = useRouter();
    const [gateway, setGateway] = useState("mellat");
    const [address, setAddress] = useState("address1");
    const [discount, setDiscount] = useState("");
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [addressMode, setAddressMode] = useState<"create" | "edit">("create");



    const cardBase =
        "flex justify-between items-center gap-8 border border-[#ECECED] p-4 px-2 rounded-sm cursor-pointer";

    const handleSubmit = () => {
        router.push("/cart/payment/success/34kj5hkjh53kj");
    };

    return (
        <>
            <div className="w-full lg:w-[73%] grid grid-cols-12 gap-4 px-6 lg:px-0">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 lg:gap-4 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg lg:py-7 px-4">
                    <div className=" rounded-sm p-4 py-4 lg:bg-white flex flex-col gap-2 text-sm  lg:text-xs border-b lg:border-none pb-12 lg:pb-4 ">
                        <div className="w-full flex items-center justify-between  border-b border-[#ECECED] pb-3">
                            <h3 className="lg:ps-1.5 font-medium text-xl lg:text-[15px] text-[#2E2F39] ">انتخاب آدرس</h3>
                            <Button onClick={() => {
                                setAddressMode("create");
                                setIsAddressModalOpen(true);
                            }} className="bg-[#FEFDF0] hover:bg-yellow-50 cursor-pointer text-gray-700 text-[11px] px-2! h-8 ">
                                <Plus className="text-gray-500 size-3.5 " />
                                <span className="hidden lg:block ">  افزودن آدرس جدید</span>
                            </Button>
                        </div>
                        <RadioGroup dir="rtl" value={address} onValueChange={setAddress} className="w-full flex flex-col gap-10 lg:gap-6  ">
                            {/* address 1 */}
                            <div
                                onClick={() => setAddress("address1")}
                                className="flex flex-col justify-between lg:items-center gap-4 lg:gap-2 px-2 border-b pb-6 border-gray-100 cursor-pointer"
                            >
                                <div className="w-full flex flex-col lg:flex-row  items-center justify-between  gap-6 lg:gap-4">
                                    <div className="w-full lg:w-fit flex items-center justify-between lg:justify-start gap-2 text-sm ">
                                        <div className="flex items-center  gap-2">
                                            <RadioGroupItem value="address1" className="block" /> خراسان رضوی - مشهد  (1) (نام و نام خانوادگی)</div>
                                        <p className="hidden lg:block font-thin text-sm lg:text-[11px] text-gray-500 ms-3">آدرس پیش‌فرض</p>
                                        <Button className="flex lg:hidden bg-transparent px-2! h-8 border border-[#F1F1F1] hover:bg-gray-50 cursor-pointer text-gray-700 text-[11px] ">
                                            <Pen className="text-gray-500 size-3 " />
                                        </Button>
                                    </div>
                                    <p className="w-full text-start block lg:hidden font-thin text-sm lg:text-[11px] text-gray-500 ms-3">آدرس پیش‌فرض</p>
                                    <div className="hidden lg:flex items-center text-[#85888E]">
                                        <Button onClick={() => {
                                            setAddressMode("edit");
                                            setIsAddressModalOpen(true);
                                        }} className="bg-transparent px-2! h-8 border border-[#F1F1F1] hover:bg-gray-50 cursor-pointer text-gray-700 text-[11px] ">
                                            <Pen className="text-gray-500 size-3 " />
                                            <span className="hidden lg:block">  ویرایش آدرس </span>
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-5 text-[11px] ">خراسان رضوی، مشهد | بلوار فلان| خیابان بهمان | ، مجتمع  کسری واحد 34 برای طولانی شدن آدرس هم این آدرس الکی را وارد میکنم.</p>
                                <div className="w-full justify-between lg:justify-start flex items-center gap-4">
                                    <span className="text-gray-500 text-xs ">تحویل گیرنده</span>
                                    <span className="text-[11px]  text-gray-700 ">نام و نام خانوادگی</span>
                                </div>
                                <div className="w-full justify-between lg:justify-start flex items-center gap-5">
                                    <span className="text-gray-500 text-xs ">شماره تماس</span>
                                    <span className="text-[11px] text-gray-700  ">0923222333</span>
                                </div>
                            </div>

                            {/* address 2 */}
                            <div
                                onClick={() => setAddress("address2")}
                                className="flex flex-col justify-between lg:items-center gap-4 lg:gap-2 px-2 rounded-sm cursor-pointer"
                            >
                                <div className="w-full flex flex-col lg:flex-row  items-center justify-between  gap-6 lg:gap-4">
                                    <div className="w-full lg:w-fit flex lg:items-center justify-between lg:justify-start gap-2 text-sm ">

                                        <div className=" flex items-center   gap-2">
                                            <RadioGroupItem value="address2" className="" />
                                            خراسان رضوی - مشهد  (2) (نام و نام خانوادگی)</div>
                                        {/* <p className="font-thin text-sm lg:text-[11px] text-gray-500 ms-3">آدرس پیش‌فرض</p> */}
                                        <Button onClick={() => {
                                            setAddressMode("edit");
                                            setIsAddressModalOpen(true);
                                        }} className="flex lg:hidden bg-transparent px-2! h-8 border border-[#F1F1F1] hover:bg-gray-50 cursor-pointer text-gray-700 text-[11px] ">
                                            <Pen className="text-gray-500 size-3 " />
                                            <span className="hidden lg:block">  ویرایش آدرس </span>
                                        </Button>
                                    </div>
                                    <div className="hidden lg:flex items-center text-[#85888E]">
                                        <Button onClick={() => {
                                            setAddressMode("edit");
                                            setIsAddressModalOpen(true);
                                        }} className="bg-transparent px-2! h-8 border border-[#F1F1F1] hover:bg-gray-50 cursor-pointer text-gray-700 text-[11px] ">
                                            <Pen className="text-gray-500 size-3 " />
                                            <span className="hidden lg:block">  ویرایش آدرس </span>
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-5 text-xs ">خراسان رضوی، مشهد | بلوار فلان| خیابان بهمان | ، مجتمع  کسری واحد 34 برای طولانی شدن آدرس هم این آدرس الکی را وارد میکنم.</p>
                                <div className="w-full justify-between lg:justify-start flex items-center gap-4">
                                    <span className="text-gray-500 text-xs ">تحویل گیرنده</span>
                                    <span className="text-xs  text-gray-700 ">نام و نام خانوادگی</span>
                                </div>
                                <div className="w-full justify-between lg:justify-start flex items-center gap-5">
                                    <span className="text-gray-500 text-xs ">شماره تماس</span>
                                    <span className="text-xs text-gray-700  ">0923222333</span>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className=" rounded-sm p-4 py-4 lg:bg-white flex flex-col gap-2 text-sm  lg:text-xs ">
                        <h3 className="lg:ps-1.5 font-medium text-xl lg:text-[15px] text-[#2E2F39]">روش ارسال</h3>
                        <div className="px-1.5 w-full flex items-center justify-between border-t border-[#ECECED] pt-3 ">
                            <p className="text-[#85888E] font-thin text-[11.5px]  leading-5">
                                تحویل و ارسال متریال‌های ساختمانی فعلاً از طریق پلتفرم انجام نمی‌شود.<br />
                                هماهنگی حمل، زمان تحویل و هزینه باربری بر عهده طرفین معامله است.<br />
                                این قابلیت به زودی با امکانات لجستیک در پلتفرم فعال خواهد شد.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-sm p-4  lg:bg-white">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between border-b border-[#ECECED] pb-2 mb-2 gap-4 lg:gap-0">
                            <h2 className="w-10/12 lg:w-fit text-start text-[14px] font-medium text-[#2E2F39] ">انتخاب درگاه و ثبت کد تخفیف</h2>

                            <div className="w-10/12 lg:w-50 custom-style-select flex flex-col justify-end gap-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="انتخاب سایر روش‌های پرداخت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["تهران", "اصفهان", "شیراز"].map(o => (
                                            <SelectItem key={o} value={o}>{o}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <RadioGroup dir="rtl" value={gateway} onValueChange={setGateway} className="w-fit flex lg:flex-col gap-6 lg:gap-4 mt-8 lg:mt-0">

                            {/* Mellat */}
                            <div
                                onClick={() => setGateway("mellat")}
                                className={
                                    cardBase +
                                    (gateway === "mellat"
                                        ? " border-[#FDE272] bg-[#FEFDF0]"
                                        : " border-[#ECECED] bg-transparent")
                                }
                            >
                                <div className="flex flex-col lg:flex-row  items-center gap-6 lg:gap-4">
                                    <div className="block lg:hidden bg-white rounded-full p-1.5 ">
                                        <Image src="/svg/material-book/melat-img11.svg" width={30} height={30} alt="mellat" />
                                    </div>
                                    <div className="hidden lg:block bg-white rounded-full p-1.5 ">
                                        <Image src="/svg/material-book/melat-img11.svg" width={20} height={20} alt="mellat" />
                                    </div>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <p className="font-thin text-sm lg:text-xs text-gray-800 mb-1">بانک ملت</p>
                                        <p className="text-[11px] lg:text-[9px] font-thin text-center lg:text-start text-[#85888E] ">پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب</p>
                                    </div>
                                </div>

                                <RadioGroupItem value="mellat" className="hidden lg:block" />
                            </div>

                            {/* Saman */}
                            <div
                                onClick={() => setGateway("saman")}
                                className={
                                    cardBase +
                                    (gateway === "saman"
                                        ? " border-[#FDE272] bg-[#FEFDF0]"
                                        : " border-[#ECECED] bg-transparent")
                                }
                            >
                                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
                                    <div className="block lg:hidden bg-white rounded-full p-1.5 ">
                                        <Image src="/svg/material-book/saman11-img.svg" width={30} height={30} alt="saman" />
                                    </div>
                                    <div className="hidden lg:block bg-white rounded-full p-1.5 ">
                                        <Image src="/svg/material-book/saman11-img.svg" width={20} height={20} alt="saman" />
                                    </div>

                                    <div className="flex flex-col items-center lg:items-start">
                                        <p className="font-thin text-sm lg:text-xs text-gray-800 mb-1">بانک سامان</p>
                                        <p className="text-[11px] lg:text-[9px] font-thin text-center lg:text-start text-[#85888E] ">پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب</p>
                                    </div>
                                </div>

                                <RadioGroupItem value="saman" className="hidden lg:block" />
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="w-full mb-2 flex justify-start ">
                        <Separator className="lg:w-[75%]! bg-[#ECECED]" />
                    </div>

                    {/* ------------------ Discount Code ------------------ */}
                    <div className="">
                        <h3 className="text-[15px] lg:text-[10px] font-thin mb-1 text-[#61646C] ">کد تخفیف</h3>
                        <div className="flex items-center relative w-full lg:w-60">
                            <Input
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                placeholder="کد تخفیف را وارد کنید"
                                className="pe-10 placeholder:text-xs! focus-within:border-[#FDE272]! h-12 lg:h-9"
                            />
                            {discount.length > 0 && (
                                <X
                                    onClick={() => setDiscount("")}
                                    className="absolute end-20 lg:end-12 me-1 top-3 lg:top-2.5 h-6 w-6 lg:h-4 lg:w-4 text-gray-400 cursor-pointer"
                                />
                            )}
                            <Button
                                className="absolute cursor-pointer rounded-xs end-[3px] top-1 h-10 lg:h-7 font-thin px-6 lg:px-3.5 lg:text-[10px] "
                            >
                                ثبت
                            </Button>
                        </div>
                    </div>
                    <div className=" w-full hidden lg:flex justify-start ">
                        <Separator className="lg:w-[75%]! bg-[#ECECED]" />
                    </div>

                    {/* ------------------ Order Details ------------------ */}
                    <div className=" rounded-sm p-4 py-2 pt-4 lg:bg-white flex flex-col gap-2 text-sm  lg:text-xs ">
                        <h3 className="lg:ps-1.5 font-medium text-xl lg:text-[15px] text-[#2E2F39]">توضیحات سفارش</h3>
                        <div className="px-1.5 w-full flex items-center justify-between border-t border-[#ECECED] pt-3 ">
                            <p className="hidden lg:block text-[#85888E]">
                                یادداشت‌ها درباره سفارش شما
                            </p>
                        </div>

                        <div className="px-1.5 w-full flex items-center justify-between ">
                            <p className="text-[#85888E]">
                                زمان ارسال سفارش
                            </p>
                            <span className="text-[#333741]"> ۱۴۰۲/۱۲/۲۳</span>
                        </div>

                        <div className="px-1.5 w-full flex items-center justify-between ">
                            <p className="text-[#85888E]">
                                مقصد
                            </p>
                            <span className="text-[#333741]">تهران</span>
                        </div>
                    </div>
                </div>

                <div className="h-fit col-span-12 lg:col-span-4 flex flex-col gap-3 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg pt-7 pb-5 lg:px-2">
                    <PaymentDetails onSubmit={handleSubmit} defaultCaption="پرداخت" />
                </div>
            </div>
            <div>

                <AddressFormModal
                    open={isAddressModalOpen}
                    mode={addressMode}
                    onClose={() => setIsAddressModalOpen(false)}
                />
            </div>

        </>
    );
}
