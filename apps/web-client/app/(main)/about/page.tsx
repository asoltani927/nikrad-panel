
import Image from "next/image"


export default function MaterialBookLanding() {

    return (
        <div className="mt-10">
            <section className="flex flex-col-reverse lg:flex-row justify-self-center  items-center gap-6 lg:gap-10">
                <div className=" flex flex-col items-start justify-center text-center px-4">
                    <h1 className="text-xl lg:text-2xl text-start font-semibold mb-2 lg:mb-4 leading-10">
                        بازار آنلاین مصالح ساختمانی، خریدی سریع،<br />مطمئن و بی‌واسطه
                    </h1>
                    <p className=" mb-4 font-medium text-justify lg:text-start lg:text-sm max-w-md text-[#0C111D] leading-6">
                        ما بستری ایجاد کرده‌ایم تا خریداران و فروشندگان مصالح ساختمانی به صورت مستقیم و بدون واسطه با هم در ارتباط باشند. در این بازار آنلاین می‌توانید انواع متریال ساختمانی و دکوراتیو را با مقایسه‌ی قیمت، کیفیت و تامین کنندگان مختلف تهیه کنید. هدف ما ساده‌تر کردن روند خرید، صرفه‌جویی در زمان و تضمین شفافیت در معاملات است.
                    </p>
                </div>
                <div className="w-96 h-96 lg:w-[400] lg:h-[370px] relative ">
                    <Image
                        src="/img/about/about-3432485.png"
                        alt="material-book"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>
            <section className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 lg:gap-12 mt-6 lg:mt-10 mb-9">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 lg:w-[42] lg:h-[42] relative mb-0.5 ">
                        <Image
                            src="/svg/about/Frame37635.svg"
                            alt="about-icon"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-lg lg:text-sm font-semibold">تنوع کالای بالا</span>
                    <p className="text-sm lg:text-xs text-[#5B5C5F] text-center leading-5 mt-2">
                        از بین صدها محصول ساختمانی و دکوراتیو، گزینه‌ی<br /> مناسب خود را انتخاب کنید.
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 lg:w-[42] lg:h-[42] relative mb-0.5 ">
                        <Image
                            src="/svg/about/Frame27636.svg"
                            alt="about-icon"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-lg lg:text-sm font-semibold">امن، سریع، آسان</span>
                    <p className="text-sm lg:text-xs text-[#5B5C5F] text-center leading-5 mt-2">
                        با چند کلیک خرید کنید و با خیال راحت کالای خود را<br /> دریافت کنید.
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 lg:w-[42] lg:h-[42] relative mb-0.5 ">
                        <Image
                            src="/svg/about/Frame17637.svg"
                            alt="about-icon"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-lg lg:text-sm font-semibold">پشتیبانی 24/7</span>
                    <p className="text-sm lg:text-xs text-[#5B5C5F] text-center leading-5 mt-2">
                        تیم پشتیبانی در 7 روز هفته و 24 ساعت شبانه‌روز<br /> آماده پاسخگویی، مشاوره و راهنمایی کاربران است.
                    </p>
                </div>
            </section>
            <section className="flex flex-col lg:flex-row justify-self-center  items-center gap-6 lg:gap-14">
                <div className="w-96 h-96 lg:w-[380] lg:h-[340px] relative ">
                    <Image
                        src="/img/about/12893228_51025551.png"
                        alt="material-book"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className=" flex flex-col items-start justify-center text-center px-4">
                    <h2 className="text-xl lg:text-lg font-semibold text-[#1C1D1F] mb-4">فروشگاه ما چگونه کار می‌کند؟</h2>
                    <p className=" font-normal text-justify lg:text-start max-w-md text-[#1F242F] lg:text-sm leading-6">
                        در پلتفرم ما، فروشندگان مصالح و متریال ساختمانی محصولات خود را به صورت مستقیم عرضه می‌کنند و خریداران می‌توانند بدون واسطه از میان آن‌ها انتخاب کنند.
                    </p>
                    <p className=" font-normal text-justify lg:text-start max-w-md text-[#1F242F] lg:text-sm leading-6">
                        کاربران با جستجوی ساده، مشاهده‌ی مشخصات فنی و مقایسه‌ی قیمت‌ها، بهترین گزینه را پیدا می‌کنند.
                    </p>
                    <p className=" font-normal text-justify lg:text-start max-w-md text-[#1F242F] lg:text-sm leading-6">
                        پس از ثبت سفارش، فرآیند پرداخت و ارسال کالا به صورت امن و شفاف انجام می‌شود.
                    </p>
                    <p className=" font-normal text-justify lg:text-start max-w-md text-[#1F242F] lg:text-sm leading-6">
                        ما با پشتیبانی 24 ساعته و نظارت بر عملکرد فروشندگان، تجربه‌ای مطمئن و راحت برای خرید مصالح ساختمانی فراهم کرده‌ایم.
                    </p>

                </div>
            </section>
            <section className="bg-[url('/svg/material-book/landing-bg-material.svg')] bg-no-repeat bg-cover mt-10 lg:mt-14 mb-8 pt-12 lg:pt-16 pb-20 lg:pb-24">
                <div className=" flex flex-col items-center text-center px-4 mt-8">
                    <h2 className="text-2xl lg:text-[40px] text-[#1C1D1F] font-semibold mb-6 ">
                        معرفی تیم
                    </h2>
                    <p className="font-light  text-center leading-6 text-base lg:text-sm text-[#61646C]">
                        تیم ما از جمعی از متخصصان حوزه‌ی ساختمان، طراحی و فناوری تشکیل  شده است که با هدف<br className="hidden lg:block" /> ساده سازی فرآیند خرید و فروش مصالح ساختمانی کنار هم آمده‌اند. ما با تکیه بر دانش و تجربه،<br className="hidden lg:block" /> تلاش می‌کنیم تجربه‌ای مدرن و قابل اعتماد برای کاربرانمان بسازیم.
                    </p>
                </div>
                <div className="w-full flex items-center justify-center gap-2 lg:gap-4 mt-9">
                    <div className="hidden lg:block w-8 h-8 lg:w-[220] lg:h-[180] relative  ">
                        <Image
                            src="/img/about/image(2).png"
                            alt="about-icon"
                            fill
                            className=" rounded-[12px] "
                        />
                    </div>
                    <div className="w-28 h-40 lg:w-[185] lg:h-[255] relative  ">
                        <Image
                            src="/img/about/image(1).png"
                            alt="about-icon"
                            fill
                            className=" rounded-[12px] "
                        />
                    </div>
                    <div className="w-36 h-56 lg:w-[280] lg:h-[385] relative  ">
                        <Image
                            src="/img/about/image(1).png"
                            alt="about-icon"
                            fill
                            className=" rounded-[12px] "
                        />
                    </div>
                    <div className="w-28 h-40 lg:w-[185] lg:h-[255] relative  ">
                        <Image
                            src="/img/about/image(1).png"
                            alt="about-icon"
                            fill
                            className=" rounded-[12px] "
                        />
                    </div>
                    <div className="hidden lg:block  w-8 h-8 lg:w-[220] lg:h-[180] relative  ">
                        <Image
                            src="/img/about/image(2).png"
                            alt="about-icon"
                            fill
                            className=" rounded-[12px] "
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
