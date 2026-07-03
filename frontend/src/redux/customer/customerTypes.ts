import type { Customer } from '@/types/customer';

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;

  loading: boolean;
  error: string | null;
}
