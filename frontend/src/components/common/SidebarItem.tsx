import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { NavigationItem } from "@/config/navigation";

interface SidebarItemProps {
  item: NavigationItem;
  isCollapsed: boolean;
}

const SidebarItem = ({ item, isCollapsed }: SidebarItemProps) => {
  const location = useLocation();

  const hasChildren = !!item.children?.length;

  const isChildActive =
    hasChildren &&
    item.children!.some((child) => location.pathname.startsWith(child.path));

  const [open, setOpen] = useState(isChildActive);

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center rounded-2xl transition-colors ${
            isCollapsed
              ? "justify-center px-0 py-3"
              : "justify-between px-4 py-3"
          } ${
            isChildActive
              ? "bg-slate-200 text-slate-950"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <item.icon size={18} />

            {!isCollapsed && (
              <span className="text-sm font-medium">{item.title}</span>
            )}
          </div>

          {!isCollapsed &&
            (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>

        {!isCollapsed && open && (
          <div className="ml-8 mt-2 flex flex-col gap-1">
            {item.children!.map((child) => (
              <NavLink
                key={child.id}
                to={child.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-slate-200 font-semibold text-slate-950"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path!}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-2xl transition-colors ${
          isCollapsed ? "justify-center px-0 py-3" : "px-4 py-3"
        } ${
          isActive
            ? "bg-slate-200 text-slate-950"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
        }`
      }
    >
      <item.icon size={18} />

      {!isCollapsed && (
        <span className="truncate text-sm font-medium">{item.title}</span>
      )}
    </NavLink>
  );
};

export default SidebarItem;
