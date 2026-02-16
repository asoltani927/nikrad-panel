import { PropsWithChildren } from "react";


export const metadata = {
  title: "ورود به حساب کاربری - فروشگاه نیکراد",
  description: "وارد حساب کاربری خود شوید یا ثبت‌نام کنید تا از امکانات فروشگاه نیکراد بهره‌مند شوید.",
};

export default function AuthLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}