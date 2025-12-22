"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MaterialCatalogCard } from "../components/material-catalog/MaterialCatalogCard"
import { useRouter } from "next/navigation"
import { materialCatalogItems } from "../components/material-catalog/materialCatalog.data"

export default function MaterialBookLanding() {

    const router = useRouter()
    const isLoggedIn = false

    const handleStart = () => {
        if (isLoggedIn) {
            router.push("/material-book/steps/basic-info")
        } else {
            router.push("/material-book/phone")
        }
    }

    return (
        <div className="-mt-4 lg:mt-16">

            <section className="flex flex-col-reverse lg:flex-row justify-self-center  items-center gap-2 lg:gap-12">
                <div className=" flex flex-col items-start justify-center text-center px-4">
                    <h1 className="text-[23px] lg:text-3xl font-semibold mb-4">دفترچه متریال</h1>
                    <p className="mb-10 lg:mb-4 font-medium text-start lg:text-[14px] max-w-md text-gray-600 lg:text-[#0C111D]">
                        تمام مشخصات، متریال و جزئیات پروژه ساختمانی شما، یکجا و در قالبی دقیق و قابل اعتماد
                    </p>

                    <div className="w-full lg:w-fit flex flex-col sm:flex-row items-center gap-4 ">
                        <Button onClick={handleStart} className="w-full cursor-pointer sm:w-32! h-12 sm:h-8!  rounded-[3px] bg-yellow-500 lg:bg-brand-primary hover:bg-[#e7bd35] text-white lg:text-[#1C1D1F] lg:text-[11px] font-medium">
                            شروع کنید
                        </Button>

                        <Link className="w-full sm:w-32!"
                            href={'#'}
                        >
                            <Button variant={"outline"} className="w-full h-12 sm:h-8! cursor-pointer bg-transparent  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] lg:text-[11px] font-medium">
                                درخواست دمو

                            </Button>
                        </Link>
                    </div>

                </div>
                <div className="w-90 h-90  lg:w-[390] lg:h-[350px] relative ">
                    <Image
                        src="/svg/material-book/6864142_28723.svg"
                        alt="material-book"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>

            <section className="flex flex-col items-center gap-12 mt-12 lg:mt-20">
                <div className=" flex flex-col items-center text-center px-4">
                    <h2 className="text-[19px] lg:text-2xl font-semibold lg:font-medium mb-5">همه چیز درباره ساختمان،یکجا و شفاف</h2>
                    <p className="-mb-2 font-light text-justify lg:text-center leading-7 text-base text-gray-600 lg:text-[#0C111D]">
                        با دفترچه متریال، تمام جزئیات فنی و ظاهری ساختمان را  به صورت دقیق، تأییدشده و<br className="hidden lg:block" /> قابل مقایسه در اختیار دارید. این ابزار طراحی شده تا هم برای خریدارن شفاف باشد و هم برای <br className="hidden lg:block" />سازندگان حرفه‌ای.
                    </p>
                </div>
                <div className="w-full lg:max-w-5xl grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-y-10 gap-x-3 lg:gap-y-12 lg:gap-x-4 px-6 lg:px-0  pt-6 mt-0">
                    {materialCatalogItems.map(item => (
                        <MaterialCatalogCard key={item.id} {...item} />
                    ))}
                </div>
            </section>

            <div className="flex lg:hidden flex-col lg:flex-row justify-self-center  items-center gap-0 lg:gap-14 mt-4">
                <div className="w-90 h-90 lg:w-[370] lg:h-[330px] relative ">
                    <Image
                        src="/svg/material-book/13107137_51384381.svg"
                        alt="material-book"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className=" flex flex-col items-start justify-center text-center px-6">
                    <h2 className="text-[23px] text-[#1C1D1F] font-medium mb-4">چرا ما؟</h2>
                    <p className=" mb-4 font-normal text-start text-base max-w-md text-[#1F242F]">
                        چند بولت‌پوینت که نشان دهد چرا دفترچه متریال شما با بقیه متفاوت است:
                    </p>

                    <ul className="flex flex-col items-start gap-4 text-[#1F242F] text-sm">
                        <li className="flex items-center gap-2.5">
                            <Image
                                src="/svg/material-book/check-ic435345.svg"
                                alt="material-book"
                                width={15}
                                height={15}
                                className=""
                            />
                            اولین پلتفرم جامع اطلاعات ساختمان در ایران
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Image
                                src="/svg/material-book/check-ic435345.svg"
                                alt="material-book"
                                width={15}
                                height={15}
                                className=""
                            />
                            تأیید کارشناسی و داده‌های واقعی
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Image
                                src="/svg/material-book/check-ic435345.svg"
                                alt="material-book"
                                width={15}
                                height={15}
                                className=""
                            />
                            طراحی حرفه‌ای  و قابل ارائه به مشتری
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Image
                                src="/svg/material-book/check-ic435345.svg"
                                alt="material-book"
                                width={15}
                                height={15}
                                className=""
                            />
                            به‌روزرسانی آنلاین پروژه‌ها

                        </li>
                    </ul>

                </div>
            </div>

            <section className="bg-[url('/svg/material-book/landing-bg-material.svg')] bg-no-repeat bg-cover mt-14 pt-16 pb-24">
                <div className="hidden lg:flex flex-col lg:flex-row justify-self-center  items-center gap-14">
                    <div className="w-8 h-8 lg:w-[370] lg:h-[330px] relative ">
                        <Image
                            src="/svg/material-book/13107137_51384381.svg"
                            alt="material-book"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className=" flex flex-col items-start justify-center text-center px-4">
                        <h2 className="text-[23px] text-[#1C1D1F] mb-4">چرا ما؟</h2>
                        <p className=" mb-4 font-normal text-start text-sm max-w-md text-[#1F242F]">
                            چند بولت‌پوینت که نشان دهد چرا دفترچه متریال شما با بقیه متفاوت است:
                        </p>

                        <ul className="flex flex-col items-start gap-4 text-[#1F242F] text-[11px]">
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                اولین پلتفرم جامع اطلاعات ساختمان در ایران
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                تأیید کارشناسی و داده‌های واقعی
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                طراحی حرفه‌ای  و قابل ارائه به مشتری
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                به‌روزرسانی آنلاین پروژه‌ها

                            </li>
                        </ul>

                    </div>
                </div>

                <div className=" flex flex-col items-center text-center px-4 mt-8">
                    <h2 className="text-[19px] lg:text-[23px] text-[#1C1D1F] font-semibold lg:font-medium mb-5 ">
                        دفترچه متریال برای چه کسانی مفید است؟
                    </h2>
                    <p className="-mb-2 font-light text-center leading-7 lg:text-sm text-[#61646C]">
                        فرقی نمی‌کند خریدار باشید یا سازنده، دفترچه متریال به شما کمک می‌کند تصمیم‌های دقیق‌تر<br className="hidden lg:block" /> بگیرید و پروژه‌ها را حرفه‌ای‌تر ارائه کنید.
                    </p>
                </div>

                <div className="flex flex-col-reverse lg:flex-row justify-self-center  items-center gap-2 lg:gap-12 mt-14">
                    <div className=" flex flex-col items-start justify-center text-center px-6 lg:px-4">
                        <h2 className="text-[23px] font-semibold lg:font-normal text-[#1C1D1F] mb-4">شفافیت در انتخاب و مقایسه ساختمان‌ها</h2>
                        <span className="text-base font-light mb-4 text-[#854A0E]">برای خریداران و مشاوران املاک</span>
                        <p className=" mb-4 font-normal text-start leading-6 lg:text-sm max-w-md text-[#61646C]">
                            خریداران و مشاوران با استفاده از دفترچه متریال می‌توانند همه جزئیات فنی و ظاهری ساختمان‌ها را مقایسه کنند. از نوع اسکلت تا جنس کف‌پوش، بدون نیاز به مراجعه حضوری یا اطلاعات پراکنده.
                        </p>

                        <ul className="flex flex-col items-start gap-4 text-[#1F242F] text-sm lg:text-[11px]">
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                مشاهده جزئیات فنی هر پروژه
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                مقایسه ساختمان‌ها به صورت هوشمند
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                اطمینان از صحت اطلاعات
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                صرفه‌جویی در زمان بررسی پروژه‌ها
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                دسترسی آنلاین و آسان در هر زمان
                            </li>
                        </ul>

                    </div>
                    <div className="w-90 h-90 lg:w-[380] lg:h-[340px] relative ">
                        <Image
                            src="/svg/material-book/49635980_9203878-removebg-preview_upscaled1.svg"
                            alt="material-book"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-self-center  items-center lg:gap-14 mt-20 lg:mt-14">
                    <div className="w-90 h-90  lg:w-[380] lg:h-[340px] relative ">
                        <Image
                            src="/svg/material-book/10172655_83491.svg"
                            alt="material-book"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className=" flex flex-col items-start justify-center text-center px-6 lg:px-4">
                        <h2 className="text-[23px] font-semibold lg:font-normal text-[#1C1D1F] mb-4">ابزاری حرفه‌ای برای معرفی پروژه‌ها</h2>
                        <span className="text-base font-light mb-4 text-[#854A0E]">برای سازندگان و توسعه‌دهندگان</span>
                        <p className=" mb-4 font-normal text-start leading-6 lg:text-sm max-w-md text-[#61646C]">
                            دفترچه متریال به سازندگان کمک می‌کند پروژه‌های خود را به شکل مستند، دقیق و جذاب ارائه دهند.<br />
                            بانمایش جزئیات واقعی متریال، کیفیت ساخت و طراحی، خریداران با  اطمینان بیشتری تصمیم می‌گیرند و برند شما در ذهنشان ماندگار می‌شود.
                        </p>

                        <ul className="flex flex-col items-start gap-4 text-[#1F242F] text-sm lg:text-[11px]">
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                نمایش حرفه‌ای کیفیت ساخت
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                ایجاد اعتماد در مشتریان
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                کاهش زمان فروش
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                ابراز بازارابی قابل اشتراک
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Image
                                    src="/svg/material-book/check-ic435345.svg"
                                    alt="material-book"
                                    width={15}
                                    height={15}
                                    className=""
                                />
                                امکان به‌روزرسانی دفترچه در طول پروژه
                            </li>
                        </ul>

                    </div>
                </div>

            </section>

            <section className="flex flex-col justify-center  items-center gap-4 py-12 px-6 lg:px-0">
                <h1 className="text-[24px] lg:text-[28px] text-gray-900 font-medium">می‌خواهید پروژه‌تان را حرفه‌ای تر ارائه کنید؟</h1>
                <p className="block lg:hidden text-base text-gray-500 ">
                    تمام مشخصات، متریال و جزئیات پروژه ساختمانی شمل، یکجا و در قالبی دقیق و قابل اعتماد
                </p>
                <div className="w-full flex-col lg:w-fit flex items-center gap-4 mb-12 lg:mb-0 mt-8 lg:mt-0">
                    <Link className="w-full sm:w-[280px]!"
                        href={'/material-book/phone'}
                    >  <Button className="w-full h-12 sm:h-8!  rounded-[3px] bg-yellow-500 lg:bg-brand-primary hover:bg-[#e7bd35] text-white lg:text-[#1C1D1F] lg:text-[11px] font-medium">
                            ایجاد دفترچه متریال
                        </Button>
                    </Link>

                    <Link className="w-full sm:w-[280px]!"
                        href={'#'}
                    >
                        <Button variant={"outline"} className="w-full h-12 sm:h-8! bg-transparent  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] lg:text-[11px] font-medium">
                            درخواست مشاوره

                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    )
}
