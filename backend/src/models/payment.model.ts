import mongoose, { Document, Schema } from "mongoose";

export type PaymentMode = "CASH" | "UPI" | "BANK";

export type CollectedBy = "DRIVER" | "MANAGER" | "OFFICE";

export interface IPayment extends Document {
  paymentNumber: string;

  customerId: mongoose.Types.ObjectId;

  customerName: string;

  totalAmount: number;

  paymentMode: PaymentMode;

  collectedBy: CollectedBy;

  driverId?: mongoose.Types.ObjectId;

  driverName?: string;

  paymentDate: Date;

  notes?: string;

  createdAt: Date;

  updatedAt: Date;
}

const paymentSchema = new Schema(
  {
    paymentNumber: {
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

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,

      enum: ["CASH", "UPI", "BANK"],

      required: true,
    },

    collectedBy: {
      type: String,

      enum: ["DRIVER", "MANAGER", "OFFICE"],

      required: true,
    },

    driverId: {
      type: Schema.Types.ObjectId,

      ref: "Driver",
    },

    driverName: {
      type: String,
    },

    paymentDate: {
      type: Date,

      default: Date.now,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IPayment>("Payment", paymentSchema);
