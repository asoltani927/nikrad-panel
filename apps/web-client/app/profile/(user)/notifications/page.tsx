import BaseContainer from "@/components/base/BaseContainer";
import { NotificationCard } from "./components/NotificationCard";
import { NotificationType } from "./components/typings/favorite.types";


export default function ProfileNotificationsPage() {
  const notificationsData: NotificationType[] = [
    {
      id: 1,
      slug: "4564561234156",
      title: 'عنوان پیام ',
      description: 'طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلار اصلی برداشته میشود',
      createAt: "4 روز پیش",
    },
    {
      id: 2,
      slug: "4564561234156",
      title: 'عنوان پیام جدید',
      description: 'طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح کزش از روی کار اصلی برداشته میشود طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح کزش از روی کار اصلی برداشته میشود',
      createAt: "1 ساعت پیش",
    },
    {
      id: 3,
      slug: "4564561234156",
      title: 'عنوان پیام ',
      description: 'طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح کزش از روی کار اصلی برداشته میشود',
      createAt: "4 روز پیش",
    },

  ];
  return (
    <div>
      {/* title  */}
      <div className="bg-gray-100 py-4 mb-10 text-sm font-medium">
        <BaseContainer className="px-6 lg:px-16">
          اعلانات
        </BaseContainer>
      </div>
      <BaseContainer className="px-6 lg:px-16">
        <div className="grid gap-4 mt-12">
          {notificationsData.map((notificationItem) => (
            <div key={notificationItem.id}>
              <NotificationCard notificationItem={notificationItem} />
            </div>
          ))}
        </div>
      </BaseContainer >
    </div >

  );
}
