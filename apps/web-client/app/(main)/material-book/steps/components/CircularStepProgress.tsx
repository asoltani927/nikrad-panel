"use client";

import React from "react";

interface CircularStepProgressProps {
    currentIndex: number;
    steps: string[];
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
}

export default function CircularStepProgress({
    currentIndex,
    steps,
    size = 120,
    strokeWidth = 9,
    color = "#EAAA08",
    bgColor = "#D9D9D9",
}: CircularStepProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const totalSteps = steps.length;
    const progressPercent = ((currentIndex + 1) / totalSteps) * 100;
    const offset = circumference - (progressPercent / 100) * circumference;

    return (
        <div className="lg:hidden flex justify-center items-center mb-8">
            <svg width={size} height={size} className="rotate-[-90deg]">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className="absolute text-[#36454F] text-[21px] font-medium">مرحله {currentIndex + 1}</div>
        </div>
    );
}
