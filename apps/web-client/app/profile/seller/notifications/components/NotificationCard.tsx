import { Circle, Clock } from "lucide-react";
import { NotificationType } from "./typings/favorite.types";


export function NotificationCard({ notificationItem }: { notificationItem: NotificationType }) {


    return (
        <div className="border rounded-lg p-6 px-4 text-sm hover:shadow-xs ">
            <div className="flex flex-col justify-between gap-4 ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        {notificationItem.title}
                        <Circle className="size-1.5 fill-yellow-500 text-yellow-500 " />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="size-3.5 " />{notificationItem.createAt} </div>
                </div>
                <p className=" text-gray-700 text-sm leading-7">
                    {notificationItem.description}
                </p>
            </div>
        </div>
    )
}