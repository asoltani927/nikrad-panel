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
        <div className="mt-10">

            <section className="flex flex-col lg:flex-row justify-self-center  items-center gap-10">
                <div className=" flex flex-col items-start justify-center text-center px-4">
                    <h1 className="text-[24px] text-start font-semibold mb-4 leading-10">
                        بازار آنلاین مصالح ساختمانی، خریدی سریع،<br />مطمئن و بی‌واسطه
                    </h1>
                    <p className=" mb-4 font-medium text-start text-[14px] max-w-md text-[#0C111D] leading-6">
                        ما بستری ایجاد کرده‌ایم تا خریداران و فروشندگان مصالح ساختمانی به صورت مستقیم و بدون واسطه با هم در ارتباط باشند. در این بازار آنلاین می‌توانید انواع متریال ساختمانی و دکوراتیو را با مقایسه‌ی قیمت، کیفیت و تامین کنندگان مختلف تهیه کنید. هدف ما ساده‌تر کردن روند خرید، صرفه‌جویی در زمان و تضمین شفافیت در معاملات است.
                    </p>

                </div>
                <div className="w-8 h-8 lg:w-[400] lg:h-[370px] relative ">
                    <Image
                        src="/img/about/about-3432485.png"
                        alt="material-book"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>

            <section className="flex flex-col items-center gap-12 mt-20">
                <div className="w-full lg:max-w-5xl grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-y-10 gap-x-4 lg:gap-y-12 lg:gap-x-4 px-6 lg:px-0  pt-6 mt-10 lg:mt-0">
                    <div>test</div>
                    <div>test</div>
                    <div>test</div>
                </div>
            </section>
            <section className="flex flex-col lg:flex-row justify-self-center  items-center gap-14">
                <div className="w-8 h-8 lg:w-[380] lg:h-[340px] relative ">
                    <Image
                        src="/img/about/12893228_51025551.png"
                        alt="material-book"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className=" flex flex-col items-start justify-center text-center px-4">
                    <h2 className="text-[17px] font-semibold text-[#1C1D1F] mb-4">فروشگاه ما چگونه کار می‌کند؟</h2>
                    <p className=" font-normal text-start max-w-md text-[#1F242F] text-xs leading-6">
                        در پلتفرم ما، فروشندگان مصالح و متریال ساختمانی محصولات خود را به صورت مستقیم عرضه می‌کنند و خریداران می‌توانند بدون واسطه از میان آن‌ها انتخاب کنند.
                    </p>
                    <p className=" font-normal text-start max-w-md text-[#1F242F] text-xs leading-6">
                        کاربران با جستجوی ساده، مشاهده‌ی مشخصات فنی و مقایسه‌ی قیمت‌ها، بهترین گزینه را پیدا می‌کنند.
                    </p>
                    <p className=" font-normal text-start max-w-md text-[#1F242F] text-xs leading-6">
                        پس از ثبت سفارش، فرآیند پرداخت و ارسال کالا به صورت امن و شفاف انجام می‌شود.
                    </p>
                    <p className=" font-normal text-start max-w-md text-[#1F242F] text-xs leading-6">
                        ما با پشتیبانی 24 ساعته و نظارت بر عملکرد فروشندگان، تجربه‌ای مطمئن و راحت برای خرید مصالح ساختمانی فراهم کرده‌ایم.
                    </p>

                </div>
            </section>



            <section className="bg-[url('/svg/material-book/landing-bg-material.svg')] bg-no-repeat bg-cover mt-14 pt-16 pb-24">


                <div className=" flex flex-col items-center text-center px-4 mt-8">
                    <h2 className="text-[40px] text-[#1C1D1F] font-semibold mb-5 ">
                        معرفی تیم
                    </h2>
                    <p className="-mb-2 font-light  text-center leading-7 text-sm text-[#61646C]">
                        .تیم ما از جمعی از متخصصان حوزه‌ی ساختمان، طراحی و فناوری تشکیل  شده است که با هدف ساده سازی فرآیند خرید و فروش مصالح ساختمانی کنار هم آمده‌اند. ما با تکیه بر دانش و تجربه، تلاش می‌کنیم تجربه‌ای مدرن و قابل اعتماد برای کاربرانمان بسازیم.
                    </p>
                </div>


            </section>


        </div>
    )
}
