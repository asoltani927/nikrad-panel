"use client";

import { useState } from "react";
import { DescriptionTab } from "./DescriptionTab";
import { SpecificationsTab } from "./SpecificationsTab";
import { ReviewsTab } from "./ReviewsTab";

type TabKey = "description" | "specifications" | "reviews";

export const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("description");

    return (
        <div className="w-full mt-16 border border-[#ECECED] rounded-[12px]">
            {/* Tabs Header */}
            <div className="h-9 flex items-center gap-2 border-gray-200 bg-[#F5F5F6] mb-7 rounded-t-[12px] ">

                <div
                    onClick={() => setActiveTab("description")}
                    className={`relative flex items-center h-full  ps-4  rounded-tr-[12px] cursor-pointer text-[10px] font-medium ${activeTab === "description"
                        ? "text-yellow-600  bg-white pe-6"
                        : "text-gray-900 pe-4"
                        }`}
                >
                    توضیح محصول
                    {
                        activeTab === "description" && (
                            <img className="absolute end-0 border-e  border-[#F5F5F6]  h-full" src="/svg/Rectangle4131.svg" />
                        )
                    }

                </div>

                <div className="h-full flex items-center">
                    {activeTab === "specifications" && (
                        <img className="border-e  border-[#FFF] h-full" src="/svg/Rectangle04131.svg" />
                    )}
                    <div
                        onClick={() => setActiveTab("specifications")}
                        className={`relative flex items-center ps-[9px]  h-full cursor-pointer text-[10px] font-medium ${activeTab === "specifications"
                            ? "text-yellow-600 bg-white pe-7 "
                            : "text-gray-900 pe-6"
                            }`}
                    >
                        ویژگی‌های محصول
                        {activeTab === "specifications" && (
                            <img className="absolute end-0 border-e-[4px]  border-[#F5F5F6] h-full" src="/svg/Rectangle4131.svg" />
                        )}

                    </div>
                </div>

                <div className="h-full flex items-center">
                    {activeTab === "reviews" && (
                        <img className="border-e  border-[#FFF] h-full" src="/svg/Rectangle04131.svg" />
                    )}

                    <div
                        onClick={() => setActiveTab("reviews")}
                        className={`relative flex items-center ps-[9px] pe-7 h-full cursor-pointer text-[10px] font-medium ${activeTab === "reviews"
                            ? " text-yellow-600 bg-white  "
                            : "text-gray-900"
                            }`}
                    >

                        نظرات مشتریان

                        <img className="absolute end-0 border-e-[4px]  border-[#F5F5F6] h-full" src="/svg/Rectangle4131.svg" />
                    </div>
                </div>

            </div>

            {/* Tabs Content */}
            <div className="px-4 min-h-24 pb-4">
                {activeTab === "description" && <DescriptionTab />}
                {activeTab === "specifications" && <SpecificationsTab />}
                {activeTab === "reviews" && <ReviewsTab />}
            </div>
        </div>
    );
};
