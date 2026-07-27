import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  expenseCategory: "Vehicle Expense" | "Office Expense" | "Salary Expense";
  expenseSubCategory: string;
  vehicleId?: mongoose.Types.ObjectId | null;
  driverId?: mongoose.Types.ObjectId | null;
  employeeName?: string | null;
  vendor?: string | null;
  notes?: string | null;
  amount?: number | null;
  spareAmount?: number | null;
  labourAmount?: number | null;
  diesel?: number | null;
  dieselAmount?: number | null;
  mileage?: number | null;
  count?: number | null;
  month?: string | null;
  expiryDate?: Date | null;
  expenseDate: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const expenseSchema = new Schema<IExpense>(
  {
    expenseCategory: { type: String, required: true, enum: ["Vehicle Expense", "Office Expense", "Salary Expense"] },
    expenseSubCategory: { type: String, required: true, trim: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", default: null },
    driverId: { type: Schema.Types.ObjectId, ref: "Driver", default: null },
    employeeName: { type: String, trim: true, default: null },
    vendor: { type: String, trim: true, default: null },
    notes: { type: String, trim: true, default: null },
    amount: { type: Number, min: 0, default: null },
    spareAmount: { type: Number, min: 0, default: null },
    labourAmount: { type: Number, min: 0, default: null },
    diesel: { type: Number, min: 0, default: null },
    dieselAmount: { type: Number, min: 0, default: null },
    mileage: { type: Number, min: 0, default: null },
    count: { type: Number, min: 0, default: null },
    month: { type: String, trim: true, default: null },
    expiryDate: { type: Date, default: null },
    expenseDate: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

expenseSchema.index({ expenseDate: -1, isDeleted: 1 });
expenseSchema.index({ expenseCategory: 1, expenseSubCategory: 1, isDeleted: 1 });

export default mongoose.model<IExpense>("Expense", expenseSchema);
