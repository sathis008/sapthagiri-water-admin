import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBookingsThunk } from "@/redux/booking";

import { Button } from "@/components/ui/button";
import BookingTableToolbar from "@/components/bookings/BookingTableToolbar";
import { bookingColumns } from "@/components/bookings/BookingColumns";

import ServerDataTable from "@/components/common/ServerDataTable";
import ServerPagination from "@/components/common/ServerPagination";

import DeleteDialog from "@/components/common/DeleteDialog";
import { deleteBookingThunk } from "@/redux/booking";
import BookingDialog from "@/components/bookings/BookingDialog";

import type { Booking } from "@/types/booking";
import AssignBookingDialog from "@/components/bookings/AssignBookingDialog";
import CompleteDeliveryDialog from "@/components/bookings/CompleteDeliveryDialog";
import BookingViewDialog from "@/components/bookings/BookingViewDialog";
import EditBookingDialog from "@/components/bookings/EditBookingDialog";

const BookingList = () => {
  const dispatch = useAppDispatch();

  const { bookings, pagination, loading } = useAppSelector(
    (state) => state.booking,
  );

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [paymentStatus, setPaymentStatus] = useState("ALL");

  const [bookingDate, setBookingDate] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [openBookingDialog, setOpenBookingDialog] = useState(false);

  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openViewDialog, setOpenViewDialog] = useState(false);

  /**
   * Fetch Bookings
   */
  const fetchBookings = useCallback(() => {
    dispatch(
      getBookingsThunk({
        page,

        limit,

        search: debouncedSearch,

        status: status === "ALL" ? undefined : status,

        paymentStatus: paymentStatus === "ALL" ? undefined : paymentStatus,

        bookingDate: bookingDate || undefined,

        sortBy,

        order: "desc",
      }),
    );
  }, [
    dispatch,
    page,
    limit,
    debouncedSearch,
    status,
    paymentStatus,
    bookingDate,
    sortBy,
  ]);

  /**
   * Search Debounce
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /**
   * Load Bookings
   */
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const columns = bookingColumns({
    onView: (booking) => {
      setSelectedBooking(booking);

      setOpenViewDialog(true);
    },

    onEdit: (booking) => {
      setSelectedBooking(booking);
      setOpenEditDialog(true);
    },

    onAssign: (booking) => {
      setSelectedBooking(booking);

      setOpenAssignDialog(true);
    },

    onComplete: (booking) => {
      setSelectedBooking(booking);

      setOpenCompleteDialog(true);
    },

    onDelete: (booking) => {
      setSelectedBooking(booking);

      setOpenDeleteDialog(true);
    },
  });

  const handleDelete = async () => {
    if (!selectedBooking) return;

    try {
      await dispatch(deleteBookingThunk(selectedBooking._id)).unwrap();

      setOpenDeleteDialog(false);

      setSelectedBooking(null);

      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left Side - Search */}
        <div className="w-full md:w-80">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Booking Number / Customer / Mobile..."
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Right Side - Button */}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setSelectedBooking(null);
              setOpenBookingDialog(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>
      </div>

      <BookingTableToolbar
        search={search}

        status={status}

        paymentStatus={paymentStatus}

        bookingDate={bookingDate}

        sortBy={sortBy}

        loading={loading}

        onSearchChange={setSearch}

        onStatusChange={setStatus}

        onPaymentStatusChange={setPaymentStatus}

        onBookingDateChange={setBookingDate}

        onSortChange={setSortBy}

        onRefresh={fetchBookings}

        onReset={() => {
          setSearch("");

          setDebouncedSearch("");

          setStatus("ALL");

          setPaymentStatus("ALL");

          setBookingDate("");

          setSortBy("createdAt");

          setPage(1);
        }}
        showSearch={false}
      />

      <ServerDataTable
        columns={columns}

        data={bookings}

        loading={loading}
      />

      <ServerPagination
        page={pagination.page}

        totalPages={pagination.totalPages}

        total={pagination.total}

        limit={pagination.limit}

        onPageChange={setPage}
      />

      {/* Booking Dialog */}
      <BookingDialog
        open={openBookingDialog}
        booking={selectedBooking}
        onOpenChange={setOpenBookingDialog}
        onSuccess={fetchBookings}
      />

      {/* Edit Booking Dialog */}
      <EditBookingDialog
        open={openEditDialog}
        booking={selectedBooking}
        onOpenChange={setOpenEditDialog}
        onSuccess={fetchBookings}
      />

      {/* Assign Booking Dialog */}
      <AssignBookingDialog
        open={openAssignDialog}
        booking={selectedBooking}
        onOpenChange={setOpenAssignDialog}
        onSuccess={fetchBookings}
      />

      {/* Complete Delivery Dialog */}

      <CompleteDeliveryDialog
        open={openCompleteDialog}
        booking={selectedBooking}
        onOpenChange={setOpenCompleteDialog}
        onSuccess={fetchBookings}
      />
      {/* Booking View Dialog */}
      <BookingViewDialog
        open={openViewDialog}
        booking={selectedBooking}
        onOpenChange={setOpenViewDialog}
      />

      {/* Booking Delete Dialog */}

      <DeleteDialog
        open={openDeleteDialog}

        onOpenChange={setOpenDeleteDialog}

        title="Delete Booking"

        description={`Are you sure you want to delete booking ${selectedBooking?.bookingNumber}?`}

        onConfirm={handleDelete}
      />
    </div>
  );
};

export default BookingList;
