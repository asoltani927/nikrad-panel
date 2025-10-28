"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
  nationalId: z
    .string()
    .regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("/images/avatar.jpg");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalId: "",
      phone: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const onSubmit = (values: ProfileFormValues) => {
    console.log("Profile Data:", values);
  };

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            ویرایش پروفایل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6 relative">
            <div className="relative group">
              <Image
                src={avatar}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full border object-cover"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white" />
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام</FormLabel>
                      <FormControl>
                        <Input placeholder="نام " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام خانوادگی</FormLabel>
                      <FormControl>
                        <Input placeholder="نام خانوادگی " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کد ملی</FormLabel>
                      <FormControl>
                        <Input placeholder="کد ملی" maxLength={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره تلفن</FormLabel>
                      <FormControl>
                        <Input placeholder="شماره تلفن" maxLength={11} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  ذخیره
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
