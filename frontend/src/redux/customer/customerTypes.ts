import type { Customer } from "@/types/customer";

export interface CustomerState {
  customers: Customer[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  selectedCustomer: Customer | null;

  loading: boolean;

  error: string | null;
}
