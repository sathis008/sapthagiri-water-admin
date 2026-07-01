import { Outlet } from "react-router-dom";
import { useState } from "react";

import AppHeader from "@/components/common/AppHeader";
import AppSidebar from "@/components/common/AppSidebar";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen bg-[#F4F4F6] text-slate-900">

      {/* Sidebar */}

      <AppSidebar isCollapsed={isSidebarCollapsed} />

      {/* Right Content */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-xl shadow-slate-200/50">
          <AppHeader
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarToggle={() => setIsSidebarCollapsed((prev) => !prev)}
          />
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;