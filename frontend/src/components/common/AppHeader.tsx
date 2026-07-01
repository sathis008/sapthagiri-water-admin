import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logoutThunk } from "@/redux/auth/authThunk";
import { APP_ROUTES } from "@/constants/routes";

interface AppHeaderProps {
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

const AppHeader = ({ isSidebarCollapsed, onSidebarToggle }: AppHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(APP_ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/95 px-6 shadow-sm shadow-slate-200/10 backdrop-blur-md">

      {/* Left Section */}

      <div className="flex items-center gap-4">

        <button
          onClick={onSidebarToggle}
          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>

        <div>
          <h1 className="text-xl font-semibold text-slate-950">Dashboard</h1>
          <p className="text-sm text-slate-500">
            A quick look at everything happening right now.
          </p>
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

                <AvatarFallback>
                  SK
                </AvatarFallback>

              </Avatar>

              <div className="hidden text-left lg:block">

                <p className="text-sm font-semibold">
                  Sathish Kumar
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>

              </div>

            </button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  );
};

export default AppHeader;