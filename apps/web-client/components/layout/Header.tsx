import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import BaseContainer from "../base/BaseContainer";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import MobileDrawer from "./MobileDrawer"
import UserNavigation from "../base/UserNavigation";
import BaseHeaderSearchInput from "../base/HeaderSearchInput";

export default function Header() {
	return (
		<header
			className="w-full bg-white px-4 sm:px-10 lg:px-14 lg:sticky flex items-center justify-center top-0 z-50 lg:shadow-xs py-6 lg:py-3.5 text-[#1C1D1F]">
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
					{/* TODO  base component */}
					<div className="hidden lg:block relative  lg:ml-auto ms-1 ">
						<div className="relative">

							<BaseHeaderSearchInput
								trigger={
									<span className="flex items-center">
										<Search className="h-4 w-4" />
										{/* <Search className="block lg:hidden  text-zinc-500 size-7" /> */}
									</span>
								}
							/>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-6">

					<div className="block lg:hidden ">

						<BaseHeaderSearchInput
							trigger={
								<span className="flex items-center">
									<Search className="h-4 w-4" />
									{/* <Search className=" text-zinc-500 size-7" /> */}
								</span>
							}
						/>

					</div>				<UserNavigation />

				</div>
			</BaseContainer>
		</header>
	);
}
