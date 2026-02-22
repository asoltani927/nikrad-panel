"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail, ArrowLeft } from "lucide-react";
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

export default function SubscriptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = useMutation<unknown, ApiError, FormValues>({
    mutationKey: ["sendEmail"],
    mutationFn: async (variables) => sendEmail(variables),
    onSuccess: () => {
      toast.success("عضویت شما با موفقیت انجام شد");
      reset();
    },
    onError: (error) => {
      if (error?.statusCode === 409) {
        toast.error("این ایمیل قبلا ثبت شده است");
      } else toast.error("خطایی رخ داده است");
    },
  });

  const onSubmit = async (data: FormValues) => {
    await mutateAsync({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-center gap-6 mt-4 mb-10">
      <div className="relative w-full sm:w-1/2">
        <Input
          {...register("email")}
          placeholder="ایمیل خود را وارد کنید"
          className="w-full h-12 placeholder:text-[13px]! text-[13px]! ps-10 border-[#CECFD2] rounded-[3px] focus:outline-none focus:ring-0 shadow-none"
        />
        <Mail className="absolute start-4 top-1/2 -translate-y-1/2 text-[#CECFD2] size-5" />
        {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
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
    </form>
  );
}