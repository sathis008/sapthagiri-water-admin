import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  name: string;

  phone: string;

  alternatePhone?: string;

  address: string;

  area?: string;

  city?: string;

  pincode?: string;

  landmark?: string;

  capacity?: number;

  price?: number;

  status: "ACTIVE" | "INACTIVE";

  notes?: string;

  createdAt: Date;

  updatedAt: Date;

  isDeleted?: boolean;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    alternatePhone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    landmark: {
      type: String,
      trim: true,
    },

    capacity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    notes: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>(
  "Customer",
  customerSchema  
);