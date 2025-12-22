"use client";
import { Check } from "lucide-react";

interface StepperProps {
    currentIndex: number;
    steps: string[];
}

export default function Stepper({ currentIndex, steps }: StepperProps) {
    const activeSize = 16;
    const offset = `${activeSize / 2}px`;
    const totalSteps = steps.length;
    const progressIndex = currentIndex === totalSteps - 1 ? currentIndex : currentIndex + 1;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;


    return (
        <div className="START w-full h-[450px] lg:h-auto flex flex-row-reverse lg:flex-col justify-end lg:justify-start gap-2 lg:gap-0 ">

            {/* TITLES */}
            <div className="relative flex flex-col lg:flex-row justify-between lg:w-full lg:mb-6">
                {steps.map((label, index) => {
                    const isUpcoming = index > currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={index}
                            className="
                                lg:absolute text-sm lg:text-[10px] font-thin whitespace-nowrap 
                                lg:right-1/2 lg:translate-x-1/2
                            "
                            style={{
                                ...(!isMobile && {
                                    right: `calc(${index} * (100% / ${totalSteps - 1}))`
                                }),
                                color: isUpcoming ? "#85888E"
                                    : isActive ? "#333741"
                                        : "#333741"
                            }}

                        >
                            {label}
                        </div>
                    );
                })}
            </div>

            {/* STEPPER */}
            <div className="relative lg:w-full flex flex-col lg:flex-row items-center justify-between">

                {/* Background Line */}
                <div
                    className="absolute h-full w-[1.5px] lg:w-auto lg:h-[1.5px] bg-gray-200 lg:bg-[#CECFD2] -z-10"
                    style={{
                        ...(!isMobile && {
                            left: offset,
                            right: offset,
                        })

                    }}
                ></div>

                {/* Progress Line */}
                <div
                    className="  hidden lg:block absolute start-2.5 lg:start-0 bg-[#EAAA08] -z-10 transition-all"
                    style={{
                        left: offset,
                        ...(isMobile
                            ? {
                                width: "1.5px",
                                height:
                                    progressIndex >= totalSteps - 1
                                        ? `calc(${progressIndex} * (100% / ${totalSteps - 1}) - 3px)`
                                        : `calc(${progressIndex} * (100% / ${totalSteps - 1}) + 7px)`,
                            }
                            : {
                                height: "1.5px",
                                width:
                                    progressIndex >= totalSteps - 1
                                        ? `calc(${progressIndex} * (100% / ${totalSteps - 1}) - 3px)`
                                        : `calc(${progressIndex} * (100% / ${totalSteps - 1}) + 7px)`,
                            }),
                    }}
                ></div><div
                    className="absolute start- bg-[#EAAA08] -z-10 transition-all lg:hidden"
                    style={{
                        width: "1.5px",
                        height:
                            progressIndex >= totalSteps - 1
                                ? `calc(${progressIndex} * (100% / ${totalSteps - 1}) - 3px)`
                                : `calc(${progressIndex} * (100% / ${totalSteps - 1}) + 7px)`
                    }}
                ></div>

                {steps.map((_, index) => {
                    const isCompleted = index < currentIndex;
                    const isActive = index === currentIndex;
                    const isUpcoming = index > currentIndex;

                    return (
                        <div key={index} className="z-10">
                            <div
                                className={`
                                relative flex items-center justify-center
                                rounded-full border transition-all
                                ${isCompleted ? "w-[20px] h-[20px] lg:w-4 lg:h-4 bg-[#EAAA08] border-[#EAAA08]" : ""}
                                ${isActive ? "w-[21px] h-[21px] lg:w-4 lg:h-4 bg-white border-[#EAAA08]" : ""}
                                ${isUpcoming ? "w-[15px] h-[15px] lg:w-2.5 lg:h-2.5 bg-gray-200 lg:bg-[#CECED2] border-gray-200 lg:border-[#CECED2]" : ""}
                                ${index === totalSteps - 1 ? "" : index === totalSteps - 2 ? "" : ""} /* shrink for last 2 steps */
                            `}
                            >
                                {isActive && (
                                    <div className="w-[13px] h-[13px] lg:w-2.5 lg:h-2.5 rounded-full bg-[#EAAA08]"></div>
                                )}

                                {isCompleted && (
                                    <Check size={11} className="absolute text-white" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
