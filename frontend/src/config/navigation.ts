import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  Truck,
  Car,
  Package,
  Wallet,
  BarChart3,
  Settings,
  //LogOut,
} from "lucide-react";

export type UserRole = "admin" | "manager";

export interface NavigationChild {
  id: string;
  title: string;
  path: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  path?: string;

  icon: LucideIcon;

  roles: UserRole[];

  showInSidebar: boolean;

  showInBreadcrumb: boolean;

  children?: NavigationChild[];
}

export const navigation: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "manager"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "customers",
    title: "Customers",
    path: "/customers",
    icon: Users,
    roles: ["admin", "manager"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "drivers",
    title: "Drivers",
    path: "/drivers",
    icon: Truck,
    roles: ["admin", "manager"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "vehicles",
    title: "Vehicles",
    path: "/vehicles",
    icon: Car,
    roles: ["admin", "manager"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "bookings",
    title: "Bookings",
    path: "/bookings",
    icon: Package,
    roles: ["admin", "manager"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "payments",
    title: "Payments",
    path: "/payments",
    icon: Wallet,
    roles: ["admin", "manager"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "expenses",
    title: "Expenses",
    path: "/expenses",
    icon: Wallet,
    roles: ["admin"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  {
    id: "reports",
    title: "Reports",
    icon: BarChart3,
    roles: ["admin"],
    showInSidebar: true,
    showInBreadcrumb: false,

    children: [
      {
        id: "booking-report",
        title: "Booking Report",
        path: "/reports/bookings",
      },
      {
        id: "payment-report",
        title: "Payment Report",
        path: "/reports/payments",
      },
      {
        id: "customer-ledger",
        title: "Customer Ledger",
        path: "/reports/customer-ledger",
      },
      {
        id: "driver-settlement",
        title: "Driver Settlement",
        path: "/reports/driver-settlement",
      },
      {
        id: "daily-collection",
        title: "Daily Collection",
        path: "/reports/daily-collection",
      },
    ],
  },

  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },

  // {
  //   id: "logout",
  //   title: "Logout",
  //   path: "/logout",
  //   icon: LogOut,
  //   roles: ["admin", "manager"],
  //   showInSidebar: true,
  //   showInBreadcrumb: false,
  // },
];
