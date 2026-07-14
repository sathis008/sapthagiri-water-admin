import api from "@/api/axios";
import { API_ENDPOINTS } from "@/api/endpoints";
import type {
  BookingReportResponse,
  PaymentReportResponse,
} from "@/types/report";

class ReportService {
  /**
   * Booking Report
   */
  async getBookingReport(
    params?: Record<string, unknown>,
  ): Promise<BookingReportResponse> {
    const response = await api.get(API_ENDPOINTS.REPORT.BOOKINGS, {
      params,
    });

    return response.data.data;
  }

  /**
   * Payment Report
   */
  async getPaymentReport(
    params?: Record<string, unknown>,
  ): Promise<PaymentReportResponse> {
    const response = await api.get(API_ENDPOINTS.REPORT.PAYMENTS, {
      params,
    });

    return response.data.data;
  }

  /**
   * Driver Settlement
   */
  async getDriverSettlement(params?: Record<string, unknown>) {
    const response = await api.get(API_ENDPOINTS.REPORT.DRIVER_SETTLEMENT, {
      params,
    });

    return response.data.data;
  }

  /**
   * Daily Collection
   */
  async getDailyCollection(params?: Record<string, unknown>) {
    const response = await api.get(API_ENDPOINTS.REPORT.DAILY_COLLECTION, {
      params,
    });

    return response.data.data;
  }

  /**
   * Customer Ledger
   */
  async getCustomerLedger(
    customerId: string,
    params?: Record<string, unknown>,
  ) {
    const response = await api.get(
      API_ENDPOINTS.REPORT.CUSTOMER_LEDGER(customerId),
      {
        params,
      },
    );

    return response.data.data;
  }

  private async downloadFile(
    url: string,
    fileName: string,
    payload?: Record<string, unknown>,
  ) {
    const response = await api.post(url, payload, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);

    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(link.href);
  }

  async downloadBookingExcel(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.BOOKING_EXCEL,
      "booking-report.xlsx",
      payload,
    );
  }

  async downloadBookingPDF(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.BOOKING_PDF,
      "booking-report.pdf",
      payload,
    );
  }

  async downloadPaymentExcel(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.PAYMENT_EXCEL,
      "payment-report.xlsx",
      payload,
    );
  }

  async downloadPaymentPDF(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.PAYMENT_PDF,
      "payment-report.pdf",
      payload,
    );
  }

  async downloadDriverSettlementExcel(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.DRIVER_SETTLEMENT_EXCEL,
      "driver-settlement.xlsx",
      payload,
    );
  }

  async downloadDriverSettlementPDF(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.DRIVER_SETTLEMENT_PDF,
      "driver-settlement.pdf",
      payload,
    );
  }

  async downloadCustomerLedgerExcel(
    customerId: string,
    payload?: Record<string, unknown>,
  ) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.CUSTOMER_LEDGER_EXCEL(customerId),
      "customer-ledger.xlsx",
      payload,
    );
  }

  async downloadCustomerLedgerPDF(
    customerId: string,
    payload?: Record<string, unknown>,
  ) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.CUSTOMER_LEDGER_PDF(customerId),
      "customer-ledger.pdf",
      payload,
    );
  }

  async downloadDailyCollectionExcel(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.DAILY_COLLECTION_EXCEL,
      "daily-collection.xlsx",
      payload,
    );
  }

  async downloadDailyCollectionPDF(payload?: Record<string, unknown>) {
    return this.downloadFile(
      API_ENDPOINTS.REPORT.DAILY_COLLECTION_PDF,
      "daily-collection.pdf",
      payload,
    );
  }
}

export default new ReportService();
