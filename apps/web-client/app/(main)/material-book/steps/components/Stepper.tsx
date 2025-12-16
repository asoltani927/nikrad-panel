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

    return (
        <div className="w-full">

            {/* TITLES */}
            <div className="relative flex justify-between w-full mb-6">
                {steps.map((label, index) => {
                    const isUpcoming = index > currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={index}
                            className="
                                absolute text-[10px] font-thin whitespace-nowrap 
                                right-1/2 translate-x-1/2
                            "
                            style={{
                                right: `calc(${index} * (100% / ${totalSteps - 1}))`,
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
            <div className="relative w-full flex items-center justify-between">

                {/* Background Line */}
                <div
                    className="absolute h-[1.5px] bg-[#CECFD2] -z-10"
                    style={{
                        left: offset,
                        right: offset,
                    }}
                ></div>

                {/* Progress Line */}
                <div
                    className="absolute start-0 h-[1.5px] bg-[#EAAA08] -z-10 transition-all"
                    style={{
                        left: offset,
                        width:
            progressIndex >= totalSteps - 1
              ? `calc(${progressIndex} * (100% / ${totalSteps - 1}) - 3px)`
              : `calc(${progressIndex} * (100% / ${totalSteps - 1}) + 7px)` // reduced 8px → 4px to fix overflow
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
                                ${isCompleted ? "w-4 h-4 bg-[#EAAA08] border-[#EAAA08]" : ""}
                                ${isActive ? "w-4 h-4 bg-white border-[#EAAA08]" : ""}
                                ${isUpcoming ? "w-2.5 h-2.5 bg-[#CECED2] border-[#CECED2]" : ""}
                                ${index === totalSteps - 1 ? "" : index === totalSteps - 2 ? "" : ""} /* shrink for last 2 steps */
                            `}
                            >
                                {isActive && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#EAAA08]"></div>
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
