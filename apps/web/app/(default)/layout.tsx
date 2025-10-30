import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "./components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="lg:px-8 px-4 py-4 w-full">
        {/* <SidebarTrigger /> */}
        <div className="mb-10"><Header /></div>
        {children}
      </main>
    </SidebarProvider>
  );
}
