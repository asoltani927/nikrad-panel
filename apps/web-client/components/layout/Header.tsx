import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import BaseContainer from "../base/BaseContainer";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "../ui/input";
import MobileDrawer from "./MobileDrawer"

export default function Header() {
	return (
		<header
			className="w-full bg-white px-[6%] lg:px-[10%] lg:sticky flex items-center justify-center top-0 z-50 lg:shadow-xs py-6 lg:py-3.5 text-[#1C1D1F]">
			<BaseContainer className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-4">
				<div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
					<div className="flex items-center gap-3">
						<MobileDrawer />
						<Link href={'/'} className="flex items-center gap-3">
							<div className="w-8 h-8 lg:w-12 lg:h-[50px] relative ">
								<Image
									src="/img/nikrad-logo.png"
									alt="Nikrad_Logo"
									fill
									className="object-contain"
								/>
							</div>
							<div className="w-[155px] h-10 lg:w-[156px] lg:h-10 relative">
								<Image
									src="/svg/nikrad-label1.svg"
									alt="Nikrad_Logo"
									fill
									className="object-contain"
								/>
							</div>
						</Link>
					</div>
					<nav className="hidden lg:flex  items-center gap-4 text-xs font-medium ms-6">
						<Link
							href={'#'}
							className=" hover:text-gray-700 "
						>
							فروشگاه
						</Link>
						<Link
							href={'/inquiries'}
							className=" hover:text-gray-700"
						>
							نیازمندی‌ها
						</Link>
						<Link
							href={'/about'}
							className=" hover:text-gray-700"
						>
							درباره ما
						</Link>
						<Link
							href={'#'}
							className=" hover:text-gray-700"
						>
							تماس با ما
						</Link>
						<Button asChild className="rounded-full">
							<Link
								href={'/material-book'}
								className="hidden items-center gap-2 rounded-full border border-[#171717] px-5 h-8! text-[11px] font-light  text-white lg:flex"
							>
								دفترچه متریال
							</Link>
						</Button>
					</nav>
					{/* TODO  base component */}
					<div className="hidden lg:block relative  lg:ml-auto ms-1 ">
						<div className="relative">
							<Input
								placeholder="جستجو"
								className="w-40 h-8 placeholder:text-[10px]! placeholder:font-thin text-[11px]!  ps-10 border-[#DADCDE] focus-within:outline-0 rounded-full  focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
							/>
							<Search className="absolute start-4 top-1/2 -translate-y-1/2 text-zinc-500 size-3.5" />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-6">
					<Search className="block lg:hidden  text-zinc-500 size-7" />
					<Link
						href={'/auth/login'}
						className=" "
					>
						<Button className="flex items-center gap-2 w-fit px-8! lg:px-7! py-1.5  rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-sm lg:text-xs font-medium">

							ورود / ثبت نام
							<ChevronLeft className="hidden lg:block h-4 w-4" />
						</Button>
					</Link>
				</div>
			</BaseContainer>
		</header>
	);
}
