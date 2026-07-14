import { useEffect, useMemo, useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/common/DataTable";

import { customerColumns } from "@/components/customer/CustomerColumns";
import CustomerDialog from "@/components/customer/CustomerDialog";

import type { Customer } from "@/types/customer";
import DeleteCustomerDialog from "@/components/customer/DeleteCustomerDialog";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  getCustomersThunk,
  // deleteCustomerThunk
} from "@/redux/customer";
import { deleteCustomerThunk } from "@/redux/customer/customerThunk";

const CustomerList = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const { customers, loading } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomersThunk());
  }, [dispatch]);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomer) return;

    const result = await dispatch(deleteCustomerThunk(selectedCustomer._id));

    if (deleteCustomerThunk.fulfilled.match(result)) {
      toast.success("Customer deleted successfully.");

      setDeleteOpen(false);

      setSelectedCustomer(null);

      dispatch(getCustomersThunk());
    } else {
      toast.error(result.payload as string);
    }
  };

  const columns = useMemo(
    () => customerColumns(handleEditCustomer, handleDeleteCustomer),
    [],
  );

  return (
    <div className="min-w-0 space-y-6">
      <DataTable
        columns={columns}
        data={customers}
        loading={loading}
        searchColumn="name"
        searchColumns={["name", "phone"]}
        searchPlaceholder="Search customers"
        toolbarActions={
          <Button onClick={handleAddCustomer}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        }
      />

      <CustomerDialog
        open={open}
        onOpenChange={setOpen}
        customer={selectedCustomer}
      />

      <DeleteCustomerDialog
        open={deleteOpen}
        customer={selectedCustomer}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CustomerList;
