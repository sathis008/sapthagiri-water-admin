import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useLocation } from "react-router-dom";

import { navigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutThunk } from "@/redux/auth/authThunk";
import { APP_ROUTES } from "@/constants/routes";

interface AppHeaderProps {
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

/** Returns the initials from a full name, e.g. "Sathish Kumar" → "SK" */
const getInitials = (name?: string | null): string => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/** Formats the role enum value to a readable label */
const formatRole = (role?: string | null): string => {
  if (!role) return "";
  const map: Record<string, string> = {
    ADMIN: "Administrator",
    MANAGER: "Manager",
  };
  return map[role.toUpperCase()] ?? role;
};

const AppHeader = ({ isSidebarCollapsed, onSidebarToggle }: AppHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const initials = getInitials(user?.name);
  const displayName = user?.name ?? "User";
  const displayRole = formatRole(user?.role);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(APP_ROUTES.LOGIN);
  };

  // Find page title — also check children routes
  const currentTitle = (() => {
    for (const item of navigation) {
      if (item.path === location.pathname) return item.title;
      if (item.children) {
        const child = item.children.find((c) => c.path === location.pathname);
        if (child) return child.title;
      }
    }
    return "Dashboard";
  })();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/95 px-6 shadow-sm shadow-slate-200/10 backdrop-blur-md">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="size-9 rounded-md"
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>

        <div>
          <h1 className="text-xl font-semibold text-slate-950">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-100">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-slate-500">{displayRole}</p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
