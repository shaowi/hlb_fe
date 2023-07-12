import { createPaymentStore } from '../shared/payment_store';

const initialStoreData = {
  applicantDetails: null,
  currMainFormData: null,
  currSubFormData: null,
  subFormDataList: [],
  transactionRows: [],
  requesterComments: '',
  showConfirmationPage: false,
  showReviewPage: false,
  errorOnConfirm: false
};

export const useRejectedPaymentStore = createPaymentStore(initialStoreData);
