import { useCallback, useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ServerDataTable from "@/components/common/ServerDataTable";
import ServerPagination from "@/components/common/ServerPagination";
import DeleteDialog from "@/components/common/DeleteDialog";
import PaymentViewDialog from "@/components/payments/PaymentViewDialog";
import type { Payment } from "@/types/payment";
import { paymentColumns } from "@/components/payments/PaymentColumns";
import PaymentTableToolbar from "@/components/payments/PaymentTableToolbar";
import PaymentDialog from "@/components/payments/PaymentDialog";
import { deletePaymentThunk, getPaymentsThunk } from "@/redux/payment";

const PaymentList = () => {
  const dispatch = useAppDispatch();

  const { payments, pagination, loading } = useAppSelector(
    (state) => state.payment,
  );

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [paymentMode, setPaymentMode] = useState("ALL");

  const [collectedBy, setCollectedBy] = useState("ALL");

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fetchPayments = useCallback(() => {
    dispatch(
      getPaymentsThunk({
        page,

        limit,

        search: debouncedSearch,

        paymentMode: paymentMode === "ALL" ? undefined : paymentMode,

        collectedBy: collectedBy === "ALL" ? undefined : collectedBy,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, paymentMode, collectedBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleDelete = async () => {
    if (!selectedPayment) return;

    await dispatch(deletePaymentThunk(selectedPayment._id)).unwrap();

    setOpenDeleteDialog(false);

    fetchPayments();
  };

  const columns = paymentColumns({
    onView: (payment) => {
      setSelectedPayment(payment);

      setOpenViewDialog(true);
    },

    onDelete: (payment) => {
      setSelectedPayment(payment);

      setOpenDeleteDialog(true);
    },
  });

  return (
    <div className="space-y-4">
      {/* Header */}

      <div className="flex justify-between">
        <input
          className="border rounded-md px-3 py-2 w-80"
          placeholder="Search Payment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={() => {
            setSelectedPayment(null);

            setOpenDialog(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Receive Payment
        </Button>
      </div>

      <PaymentTableToolbar
        paymentMode={paymentMode}
        collectedBy={collectedBy}
        loading={loading}
        onPaymentModeChange={setPaymentMode}
        onCollectedByChange={setCollectedBy}
        onRefresh={fetchPayments}
      />

      <ServerDataTable columns={columns} data={payments} loading={loading} />

      <ServerPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={setPage}
      />

      <PaymentDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSuccess={fetchPayments}
      />

      <PaymentViewDialog
        open={openViewDialog}
        paymentId={selectedPayment?._id ?? null}
        onOpenChange={setOpenViewDialog}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Delete Payment"
        description={`Are you sure you want to delete payment "${selectedPayment?.paymentNumber}"? All related bookings will be marked as PENDING again.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default PaymentList;
