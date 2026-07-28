import { createSlice } from "@reduxjs/toolkit";

import {
  getBookingReportThunk,
  getPaymentReportThunk,
  getCustomerLedgerThunk,
  getDriverSettlementThunk,
  getDailyCollectionThunk,
  getExpenseReportThunk,
  getVehicleExpenseReportThunk,
  getSalaryReportThunk,
  getProfitAndLossReportThunk,
} from "./report.thunk";
import type {
  BookingReportResponse,
  PaymentReportResponse,
  DriverSettlementResponse,
  DailyCollectionResponse,
  CustomerLedgerResponse,
  ExpenseReportResponse,
  ProfitAndLossReport,
} from "@/types/report";

interface ReportState {
  bookingReport: BookingReportResponse | null;

  paymentReport: PaymentReportResponse | null;

  customerLedger: CustomerLedgerResponse | null;

  driverSettlement: DriverSettlementResponse | null;

  dailyCollection: DailyCollectionResponse | null;
  expenseReport: ExpenseReportResponse | null;
  vehicleExpenseReport: ExpenseReportResponse | null;
  salaryReport: ExpenseReportResponse | null;
  profitAndLossReport: ProfitAndLossReport | null;

  loading: boolean;

  error: string | null;
}

const initialState: ReportState = {
  bookingReport: null,

  paymentReport: null,

  customerLedger: null,

  driverSettlement: null,

  dailyCollection: null,
  expenseReport: null,
  vehicleExpenseReport: null,
  salaryReport: null,
  profitAndLossReport: null,

  loading: false,

  error: null,
};

const reportSlice = createSlice({
  name: "report",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getBookingReportThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBookingReportThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.bookingReport = action.payload;
      })

      .addCase(getBookingReportThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    builder.addCase(getPaymentReportThunk.fulfilled, (state, action) => {
      state.paymentReport = action.payload;
    });

    builder.addCase(getCustomerLedgerThunk.fulfilled, (state, action) => {
      state.customerLedger = action.payload;
    });

    builder.addCase(getDriverSettlementThunk.fulfilled, (state, action) => {
      state.driverSettlement = action.payload;
    });

    builder.addCase(getDailyCollectionThunk.fulfilled, (state, action) => {
      state.dailyCollection = action.payload;
    });
    builder.addCase(getExpenseReportThunk.fulfilled, (state, action) => { state.loading = false; state.expenseReport = action.payload; });
    builder.addCase(getVehicleExpenseReportThunk.fulfilled, (state, action) => { state.loading = false; state.vehicleExpenseReport = action.payload; });
    builder.addCase(getSalaryReportThunk.fulfilled, (state, action) => { state.loading = false; state.salaryReport = action.payload; });
    builder.addCase(getProfitAndLossReportThunk.fulfilled, (state, action) => { state.loading = false; state.profitAndLossReport = action.payload; });
  },
});

export default reportSlice.reducer;
