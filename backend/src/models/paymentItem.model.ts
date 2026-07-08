import mongoose, { Document, Schema } from "mongoose";

export interface IPaymentItem extends Document {
  paymentId: mongoose.Types.ObjectId;

  bookingId: mongoose.Types.ObjectId;

  amount: number;
}

const paymentItemSchema = new Schema(
  {
    paymentId: {
      type: Schema.Types.ObjectId,

      ref: "Payment",

      required: true,
    },

    bookingId: {
      type: Schema.Types.ObjectId,

      ref: "Booking",

      required: true,
    },

    amount: {
      type: Number,

      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IPaymentItem>("PaymentItem", paymentItemSchema);
