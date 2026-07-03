import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  title: string;
  path: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

const SidebarItem = ({ title, path, icon: Icon, isCollapsed }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-2xl transition-colors ${
          isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'
        } ${
          isActive
            ? 'bg-slate-200 text-slate-950'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
        }`
      }
    >
      <Icon size={18} className="text-current" />
      <span className={`${isCollapsed ? 'sr-only' : 'truncate text-sm font-medium'}`}>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
