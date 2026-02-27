"use client";


import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import BaseContainer from "../base/BaseContainer";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import ProfileMobileDrawer from "./ProfileMobileDrawer"
import { useAuth } from "@/providers/auth.provider";

export default function ProfileHeader() {

	const { user } = useAuth()

	return (
		<header
			className="w-full bg-white px-4 sm:px-10 lg:px-14 lg:sticky flex items-center justify-center top-0 z-50 border-b py-6 lg:py-3.5 text-[#1C1D1F]">
			<BaseContainer className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-4">
				<div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
					<div className="flex items-center gap-3">
						<ProfileMobileDrawer />
						<Link href={'/'} className="hidden lg:flex items-center gap-3 ">
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
						<Link href={'/'} className="block lg:hidden" >داشبورد</Link>
					</div>
					<nav className="hidden lg:flex  items-center gap-4 text-sm font-medium ms-6">
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
								className="hidden items-center gap-2 rounded-full border border-[#171717] px-5 h-8! text-xs font-light  text-white lg:flex"
							>
								دفترچه متریال
							</Link>
						</Button>
					</nav>
					<div className="hidden lg:block relative  lg:ml-auto ms-1 ">
						<div className="relative">
							<Input
								placeholder="جستجو"
								className="w-40 h-8 placeholder:text-xs! placeholder:font-thin text-[11px]!  ps-10 border-[#DADCDE] focus-within:outline-0 rounded-full  focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
							/>
							<Search className="absolute start-4 top-1/2 -translate-y-1/2 text-zinc-500 size-4" />
						</div>
					</div>
				</div>

				<div className="flex gap-2 items-center">

					{
						(user?.shops && user.shops.length) && <>
							<Button asChild className="rounded-full">
								<Link
									href={'/profile/seller'}
									className="w-fit hidden items-center gap-2 rounded-full border border-[#171717] px-5 h-8! text-xs font-light  text-white lg:flex"
								>
									فروشگاه
								</Link>
							</Button>
						</>
					}
					{
						!(user?.shops && user.shops.length) && <>
						<Button asChild className="rounded-full" variant={"ghost"}>
								<Link
									href={'/profile/seller'}
									className="w-fit hidden items-center gap-2 rounded-full border border-[#171717] px-5 h-8! text-xs font-light lg:flex"
								>
									فروشگاه هستم!!
								</Link>
							</Button>
						</>
					}

					<Button asChild className="rounded-full">
						<Link
							href={'/profile/products/new'}
							className="w-fit hidden items-center gap-2 rounded-full border border-[#171717] px-5 h-8! text-xs font-light  text-white lg:flex"
						>
							ثبت محصول
						</Link>
					</Button>
				</div>

			</BaseContainer>
		</header>
	);
}
