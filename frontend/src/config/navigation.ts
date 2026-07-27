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
} from "lucide-react";

// Must match backend User model enum values (case-insensitive comparison via hasRole)
export type UserRole = "ADMIN" | "MANAGER";

export interface NavigationChild {
  id: string;
  title: string;
  path: string;
  /** Optional role restriction for child items */
  roles?: UserRole[];
}

export interface NavigationItem {
  id: string;
  title: string;
  path?: string;
  icon: LucideIcon;
  /** Which roles can see this menu item */
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
    roles: ["ADMIN", "MANAGER"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
  {
    id: "customers",
    title: "Customers",
    path: "/customers",
    icon: Users,
    roles: ["ADMIN", "MANAGER"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
  {
    id: "drivers",
    title: "Drivers",
    path: "/drivers",
    icon: Truck,
    roles: ["ADMIN", "MANAGER"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
  {
    id: "vehicles",
    title: "Vehicles",
    path: "/vehicles",
    icon: Car,
    roles: ["ADMIN", "MANAGER"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
  {
    id: "bookings",
    title: "Bookings",
    path: "/bookings",
    icon: Package,
    roles: ["ADMIN", "MANAGER"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
  {
    id: "payments",
    title: "Payments",
    path: "/payments",
    icon: Wallet,
    // Both Admin and Manager can see Payments
    roles: ["ADMIN", "MANAGER"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
  {
    id: "reports",
    title: "Reports",
    icon: BarChart3,
    // Show in sidebar for both roles, but routes are protected via RoleGuard
    roles: ["ADMIN", "MANAGER"],
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
        roles: ["ADMIN"], // Manager cannot see Payment Report
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
    // Manager must NOT see Settings / future User Management
    roles: ["ADMIN"],
    showInSidebar: true,
    showInBreadcrumb: true,
  },
];
