import { createPaymentStore } from '../shared/payment_store';

const initialStoreData = {
  applicantDetails: null,
  currMainFormData: null,
  currSubFormData: null,
  subFormDataList: [],
  transactionRows: [],
  transactionColumns: [],
  transactionSummaryData: null,
  showConfirmationPage: false,
  showReviewPage: false,
  errorOnConfirm: false
};

export const useRejectedPaymentStore = createPaymentStore(initialStoreData);
