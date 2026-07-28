import AppLogo from "./AppLogo";
import SidebarItem from "./SidebarItem";
import { navigation } from "@/config/navigation";
import { useAppSelector } from "@/redux/hooks";
import { hasRole } from "@/utills/auth";
import type { UserRole } from "@/types/auth";

interface AppSidebarProps {
  isCollapsed: boolean;
}

const AppSidebar = ({ isCollapsed }: AppSidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.role as UserRole | undefined;

  const visibleNav = navigation.filter(
    (item) => item.showInSidebar && hasRole(userRole, item.roles),
  );

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col bg-[#F4F4F6] backdrop-blur-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-55"
      }`}
    >
      {/* Logo */}

      <AppLogo isCollapsed={isCollapsed} />

      {/* Menu */}

      <nav className={`flex-1 overflow-y-auto ${isCollapsed ? "p-2" : "p-4"}`}>
        {visibleNav.map((item) => (
          <SidebarItem key={item.id} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
