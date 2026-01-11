"use client";

import { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";



interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change: number;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    change,
}: StatCardProps) {
    const isNegative = change < 0;

    const chartData = [
        { value: 20 },
        { value: 35 },
        { value: 30 },
        { value: 45 },
        { value: 40 },
        { value: 55 },
    ];


    return (
        <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
                <div className="bg-yellow-50 p-2.5 rounded-full">
                    <Icon className="text-yellow-600 size-4.5" />
                </div>
                <span className="text-gray-600 font-base">{title}</span>
            </div>

            <div className="w-full flex items-center justify-between mt-4">
                <div>
                    <span className="font-bold text-xl text-black">{value}</span>

                    <div className="flex items-center gap-1 mt-4">
                        {isNegative ? (
                            <ArrowDown className="text-red-600 size-3.5" />
                        ) : (
                            <ArrowUp className="text-green-600 size-3.5" />
                        )}

                        <span
                            className={clsx(
                                "text-xs",
                                isNegative ? "text-red-700" : "text-green-700"
                            )}
                        >
                            {Math.abs(change)}%
                        </span>

                        <span className="text-xs text-gray-600 ms-1">
                            نسبت به ماه پیش
                        </span>
                    </div>
                </div>

                <div className="w-1/2 lg:w-24 h-32 lg:h-14">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#DC2626" stopOpacity={0.6} />
                                    <stop offset="100%" stopColor="#FEE2E2" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.6} />
                                    <stop offset="100%" stopColor="#DCFCE7" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>

                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isNegative ? "#DC2626" : "#16A34A"}
                                fill={isNegative ? "url(#redGradient)" : "url(#greenGradient)"}
                                strokeWidth={1.5}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>


            </div>
        </div>
    );
}
