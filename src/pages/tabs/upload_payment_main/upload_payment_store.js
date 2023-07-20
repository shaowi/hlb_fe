import { createPaymentStore } from '../shared/payment_store';
import { APPLICANT_DETAILS } from './../form_templates';

const initialStoreData = {
  applicantDetails: APPLICANT_DETAILS,
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
