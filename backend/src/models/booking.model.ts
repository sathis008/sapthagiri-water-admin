import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  bookingNumber: string;

  customerId: mongoose.Types.ObjectId;

  customerName: string;

  phone: string;

  address: string;

  capacity: number;

  price: number;

  bookingDate: Date;

  status: "CONFIRMED" | "ASSIGNED" | "DELIVERED" | "CANCELLED";

  paymentStatus: "PENDING" | "PAID";

  collectionMethod?:
    "DRIVER_COLLECTION" | "ACCOUNT_COLLECTION" | "OFFICE_COLLECTION";

  vehicleId?: mongoose.Types.ObjectId;

  vehicleNumber?: string;

  isDeleted: boolean;

  deletedAt?: Date | null;

  driverId?: mongoose.Types.ObjectId;

  driverName?: string;

  notes?: string;

  createdAt: Date;

  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "ASSIGNED", "DELIVERED", "CANCELLED"],
      default: "CONFIRMED",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    collectionMethod: {
      type: String,
      enum: ["DRIVER_COLLECTION", "ACCOUNT_COLLECTION", "OFFICE_COLLECTION"],
    },

    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    vehicleNumber: String,

    driverId: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    driverName: String,

    notes: String,

    createdAt: Date,

    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
