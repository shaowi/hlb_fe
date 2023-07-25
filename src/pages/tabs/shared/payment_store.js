import { create } from 'zustand';

export const createPaymentStore = (initialStoreData) =>
  create((set) => ({
    ...initialStoreData,
    setApplicantDetails: (applicantDetails) =>
      set({ applicantDetails: applicantDetails }),
    setCurrMainFormData: (currMainFormData) =>
      set({ currMainFormData: currMainFormData }),
    setCurrSubFormData: (currSubFormData) =>
      set({ currSubFormData: currSubFormData }),
    resetCurrSubFormData: () =>
      set({ currSubFormData: initialStoreData.currSubFormData }),
    setSubFormDataList: (subFormDataList) =>
      set({ subFormDataList: subFormDataList }),
    resetSubFormDataList: () =>
      set({ subFormDataList: initialStoreData.subFormDataList }),
    setTransactionRows: (transactionRows) => set({ transactionRows }),
    setTransactionColumns: (transactionColumns) => set({ transactionColumns }),
    setTransactionSummaryData: (transactionSummaryData) =>
      set({ transactionSummaryData: transactionSummaryData }),
    setShowConfirmationPage: (showConfirmationPage) =>
      set({ showConfirmationPage: showConfirmationPage }),
    setShowReviewPage: (showReviewPage) =>
      set({ showReviewPage: showReviewPage }),
    setErrorOnConfirm: (errorOnConfirm) =>
      set({ errorOnConfirm: errorOnConfirm }),
    resetStore: () => {
      const {
        applicantDetails,
        currMainFormData,
        currSubFormData,
        subFormDataList,
        transactionRows,
        transactionColumns,
        transactionSummaryData,
        showConfirmationPage,
        showReviewPage,
        errorOnConfirm
      } = initialStoreData;
      set({
        applicantDetails,
        currMainFormData,
        currSubFormData,
        subFormDataList,
        transactionRows,
        transactionColumns,
        transactionSummaryData,
        showConfirmationPage,
        showReviewPage,
        errorOnConfirm
      });
    }
  }));
