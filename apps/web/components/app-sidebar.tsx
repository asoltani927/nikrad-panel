import { ArrowLeft, Calendar, ChevronLeft, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { sidebarItems } from "./sidebar-items";

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center text-lg flex justify-center border-b">
            NIKRAD
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {sidebarItems.map((item) => (
                <Collapsible key={item.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild size="lg" className="group">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-[15px] w-full justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
                          {item.children && (
                            <ChevronLeft className="transition-transform duration-200 group-data-[state=open]:-rotate-90" />
                          )}
                        </button>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.children && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <a
                                href={child.url}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition my-1"
                              >
                                <child.icon className="w-4 h-4" />
                                <span>{child.title}</span>
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
