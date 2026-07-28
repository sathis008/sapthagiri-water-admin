import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import type { Booking, BookingStatus, CollectionMethod } from "@/types/booking";
import type { Customer } from "@/types/customer";
import type { Driver } from "@/types/driver";
import type { Vehicle } from "@/types/vehicle";

import BookingCustomer from "./BookingCustomer";
import BookingInformation from "./BookingInformation";
// import BookingNotes from "./BookingNotes";
import AssignBookingSection from "./AssignBookingSection";
import CompleteDeliverySection from "./CompleteDeliverySection";
import CustomerService from "@/services/customer.service";
import driverService from "@/services/driver.service";
import vehicleService from "@/services/vehicle.service";
import { useAppDispatch } from "@/redux/hooks";

import { updateBookingThunk } from "@/redux/booking";

interface EditBookingFormProps {
  booking: Booking;
  onSuccess: () => void;
}

const EditBookingForm = ({ booking, onSuccess }: EditBookingFormProps) => {
  const [status, setStatus] = useState<BookingStatus>("CONFIRMED");

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [capacity, setCapacity] = useState("");

  const [price, setPrice] = useState(0);

  const [bookingDate, setBookingDate] = useState("");

  const [driver, setDriver] = useState<Driver | null>(null);

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const [collectionMethod, setCollectionMethod] =
    useState<CollectionMethod>("DRIVER");

  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [notes, setNotes] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    if (!capacity || Number(capacity) <= 0) {
      alert("Please enter a valid capacity.");
      return;
    }

    if (!price || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!bookingDate) {
      alert("Please select booking date.");
      return;
    }

    if (
      (status === "ASSIGNED" || status === "DELIVERED") &&
      (!driver || !vehicle)
    ) {
      alert("Please select Driver and Vehicle.");
      return;
    }

    if (status === "DELIVERED" && !collectionMethod) {
      alert("Please select Collection Method.");
      return;
    }

    try {
      await dispatch(
        updateBookingThunk({
          id: booking._id,

          payload: {
            customerId: selectedCustomer._id,

            capacity: Number(capacity),

            price,

            bookingDate,

            status,

            driverId: driver?._id,

            vehicleId: vehicle?._id,

            collectionMethod,

            notes,
          },
        }),
      ).unwrap();

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(booking.status);

    setCapacity(String(booking.capacity));

    setPrice(booking.price);

    setBookingDate(booking.bookingDate.split("T")[0]);

    setNotes(booking.notes ?? "");
    setCollectionMethod(booking.collectionMethod ?? "DRIVER");

    setDeliveryNotes(booking.notes ?? "");

    // These will be loaded later
    // setSelectedCustomer(...)
    // setDriver(...)
    // setVehicle(...)
    // setCollectionMethod(...)
  }, [booking]);

  useEffect(() => {
    if (!booking.customerId) return;

    const loadCustomer = async () => {
      try {
        const customer = await CustomerService.getCustomerById(
          booking.customerId,
        );

        setSelectedCustomer(customer);

        console.log("Selected Customer:", customer);
      } catch (error) {
        console.error("Failed to load customer:", error);
      }
    };

    loadCustomer();
  }, [booking.customerId]);

  useEffect(() => {
    if (!booking.driverId) return;

    const loadDriver = async () => {
      const driver = await driverService.getDriverById(
        booking.driverId?.toString() || "",
      );

      setDriver(driver);
    };

    loadDriver();
  }, [booking.driverId]);

  useEffect(() => {
    if (!booking.vehicleId) return;

    const loadVehicle = async () => {
      const vehicle = await vehicleService.getVehicleById(
        booking.vehicleId?.toString() || "",
      );

      setVehicle(vehicle);
    };

    loadVehicle();
  }, [booking.vehicleId]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status */}

      <div className="rounded-lg border p-5">
        <h3 className="mb-4 text-lg font-semibold">Booking Status</h3>

        <select
          className="w-full rounded-md border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as BookingStatus)}
        >
          <option value="CONFIRMED">Confirmed</option>

          <option value="ASSIGNED">Assigned</option>

          <option value="DELIVERED">Delivered</option>

          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Customer */}

      <BookingCustomer
        customer={selectedCustomer}
        onCustomerSelect={(customer) => {
          setSelectedCustomer(customer);

          setCapacity(customer.capacity ?? "");

          setPrice(customer.price ?? 0);
        }}
      />

      {/* Booking */}

      <BookingInformation
        capacity={capacity}
        price={price}
        bookingDate={bookingDate}
        onCapacityChange={setCapacity}
        onPriceChange={setPrice}
        onBookingDateChange={setBookingDate}
      />

      {/* Assignment */}

      {(status === "ASSIGNED" || status === "DELIVERED") && (
        <AssignBookingSection
          driver={driver}
          vehicle={vehicle}
          onDriverChange={setDriver}
          onVehicleChange={setVehicle}
        />
      )}

      {/* Delivery */}

      {status === "DELIVERED" && (
        <CompleteDeliverySection
          collectionMethod={collectionMethod}
          notes={deliveryNotes}
          onCollectionMethodChange={setCollectionMethod}
          onNotesChange={setDeliveryNotes}
        />
      )}

      {/* Notes */}
      {/* 
      <BookingNotes
        notes={notes}
        onNotesChange={setNotes}
        onCancel={onSuccess}
      /> */}

      {/* Buttons */}

      <div className="flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={onSuccess}>
          Cancel
        </Button>

        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default EditBookingForm;
