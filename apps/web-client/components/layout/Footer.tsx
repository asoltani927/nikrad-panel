'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import BaseContainer from "../base/BaseContainer";
import { ArrowLeft, Mail, Square } from "lucide-react";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/actions/newsletter/send-email.action";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, "ایمیل الزامی است").email("فرمت ایمیل معتبر نیست"),
});

type FormValues = z.infer<typeof formSchema>;

interface ApiError {
  statusCode: number;
  message: string;
}

export default function LayoutFooter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = useMutation<unknown, ApiError, FormValues>(
    {
      mutationKey: ["sendEmail"],
      mutationFn: async (variables) => {
        return await sendEmail({
          ...variables,
        });
      },
      onSuccess: (data) => {
        console.log("Email sent successfully:", data);
        toast.success("عضویت شما با موفقیت انجام شد");
        reset();
      },
      onError: (error) => {
        console.error("Error sending email:", error);
        if (error?.statusCode === 409) {
          toast.error("این ایمیل قبلا ثبت شده است");
        } else toast.error("خطایی رخ داده است");
      },
    },
  );

  const onSubmit = async (data: FormValues) => {
    await mutateAsync({
      email: data.email,
    });
  };

  return (
    <footer className="w-full bg-white text-[#1F242F] px-[8%] lg:px-[14%] bg-linear-to-b from-[#FFFBE4] to-[#F7F7F7] lg:bg-[url('/img/Footer.png')] bg-cover bg-no-repeat flex items-center justify-center top-0 z-50 shadow-xs py-14 lg:py-16 text-[#1C1D1F]">
      <BaseContainer className="flex flex-col items-center gap-4">
        <div className=" w-full flex lg:hidden flex-col lg:ps-20">
          <div className="flex flex-col gap-4 text-[13px] font-extralight">
            <div className="font-semibold text-[19px]">خبرنامه</div>
            <div className="text-[15px] flex items-center gap-1 text-[#61646C] hover:text-gray-700 leading-7 ">
              با عضویت در خبرنامه شرکت نیک راد، از آخرین رویدادها، اخبار و
              مقالات و به روزترین لیست قیمت محصولات شرکت باخبر شوید.
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 mb-10">
              <div className="relative w-full sm:w-1/2">
                <Input
                  {...register("email")}
                  placeholder="ایمیل خود را وارد کنید"
                  className="w-full h-12 placeholder:text-[13px]! text-[13px]! ps-10 border-[#CECFD2] rounded-[3px] focus:outline-none focus:ring-0 shadow-none"
                />
                <Mail className="absolute start-4 top-1/2 -translate-y-1/2 text-[#CECFD2] size-5" />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isPending}
                type="submit"
                className="w-full sm:w-1/2 px-7! h-12 rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-[15px] font-medium"
              >
                <span className="flex items-center gap-2">
                  {isPending ? "در حال ثبت ایمیل" : "عضویت"}
                  {!isPending && <ArrowLeft className="h-4 w-4" />}
                </span>
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full grid lg:grid-cols-2">
          <div className="w-full lg:w-10/12 flex flex-col ">
            <Link href={"/"} className="flex items-center gap-1">
              <Image
                src="/img/nikrad-logo.png"
                alt="Nikrad_Logo"
                width={48}
                height={50}
                className="hidden lg:block"
              />
              <Image
                src="/img/nikrad-logo.png"
                alt="Nikrad_Logo"
                width={38}
                height={40}
                className="block lg:hidden"
              />
              <h2 className="relative z-10 text-[23px] font-semibold lg:font-bold text-gray-900">
                مصالح ساختمانی نیکراد
              </h2>
            </Link>
            <p className="text-[#61646C] text-[17px] mt-2 leading-7">
              طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند
              که محتوای اصلی صفحات آماده نیست. در نتیجه طرح کزش از روی کار اصلی
              برداشته میشود{" "}
            </p>
            <div className="font-medium text-[17px] mt-4">آدرس</div>
            <p className="text-[#61646C] text-base mt-2">
              تهران - کیلومتر 35 - شهرک صنعتی - 20 متری چهارم
            </p>
          </div>
          <div className="w-10/12 flex flex-col lg:ps-20">
            <div className="font-medium text-[17px] mt-4">شماره تماس</div>
            <p className="text-[#61646C] text-base mt-2">021-1111111</p>
            <div className="font-medium text-[17px] mt-4">ایمیل</div>
            <p className="text-[#61646C] text-base mt-2">Info@nikrad.com</p>
            <div className="font-medium text-[17px] mt-4">شبکه‌های اجتماعی</div>
            <div className="flex items-center gap-4 mt-2">
              <Image
                src="/img/facebook11.png"
                alt="facebook"
                width={23}
                height={23}
              />
              <Image
                src="/img/telegram11.png"
                alt="telegram"
                width={23}
                height={23}
              />
              <Image
                src="/img/whatsapp11.png"
                alt="whatsapp"
                width={23}
                height={23}
              />
            </div>
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-2 mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-3 text-[13px] font-extralight">
              <div className="font-semibold text-[17px]">محصولات</div>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                شیرآلات
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                درب ضد سرقت
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                ترمو وال
              </Link>
            </div>
            <div className="flex flex-col gap-3 text-[13px] font-extralight">
              <div className="font-semibold text-[17px]">دسترسی آسان</div>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                لیست قیمت
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                دفترچه متریال
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                درباره ما
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                وبلاگ
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                تماس با ما
              </Link>
            </div>
            <div className="flex flex-col gap-3 text-[13px] font-extralight">
              <div className="font-semibold text-[17px]">دسترسی آسان</div>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                دریافت کاتالوگ شرکت
              </Link>
              <Link
                href={"#"}
                className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 "
              >
                <Square size={3} color="#FAC515" fill="#FAC515" />
                فرم رضایتمندی مشتریان
              </Link>
            </div>
          </div>
          <div className="w-full hidden lg:flex flex-col lg:ps-20">
            <div className="flex flex-col gap-4 text-[13px] font-extralight">
              <div className="font-semibold text-[17px]">خبرنامه</div>
              <div className=" flex items-center gap-1 text-[#61646C] hover:text-gray-700 ">
                با عضویت در خبرنامه شرکت نیک راد، از آخرین رویدادها، اخبار و
                مقالات و به روزترین لیست قیمت محصولات شرکت باخبر شوید.
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative w-full">
                  <Input
                    {...register("email")}
                    placeholder="ایمیل خود را وارد کنید"
                    className="w-full h-10 placeholder:text-[11px]! text-[11px]! ps-10 border-[#CECFD2] rounded-[3px] focus:outline-none focus:ring-0 shadow-none"
                  />
                  <Mail className="absolute start-4 top-1/2 -translate-y-1/2 text-[#CECFD2] size-4" />

                  {errors.email && (
                    <p className="text-red-500 text-[10px] mt-1 absolute">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="px-7! h-10 rounded-[3px] bg-[#FAC515] hover:bg-[#e7bd35] text-[#1C1D1F] text-xs font-medium"
                >
                  <span className="flex items-center gap-2">
                    {isPending ? "در حال ثبت ایمیل" : "عضویت"}

                    {!isPending && <ArrowLeft className="h-4 w-4" />}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </BaseContainer>
    </footer>
  );
}
