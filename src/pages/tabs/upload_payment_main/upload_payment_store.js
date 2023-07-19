import { createPaymentStore } from '../shared/payment_store';

const initialStoreData = {
  applicantDetails: null,
  currMainFormData: null,
  currSubFormData: null,
  subFormDataList: [],
  transactionRows: [],
  transactionSummaryData: null,
  showConfirmationPage: false,
  showReviewPage: false,
  errorOnConfirm: false
};

export const useUploadPaymentStore = createPaymentStore(initialStoreData);
