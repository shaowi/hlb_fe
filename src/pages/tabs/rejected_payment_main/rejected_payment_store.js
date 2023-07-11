import { create } from 'zustand';
import {
  APPLICANT_DETAILS,
  BENEFICIARY_DETAILS,
  CHARGES_DETAILS,
  CORRESPONDENT_BANK_DETAILS,
  PAYMENT_DETAILS,
  SUB_FILE_DETAILS,
  TRANSACTION_DETAILS
} from '../form_templates';

const INITIAL_PAYMENT_SUB_FORM_STATE = {
  ...SUB_FILE_DETAILS,
  ...APPLICANT_DETAILS,
  ...BENEFICIARY_DETAILS,
  ...PAYMENT_DETAILS,
  ...CHARGES_DETAILS,
  ...CORRESPONDENT_BANK_DETAILS,
  ...TRANSACTION_DETAILS
};

export const useRejectedPaymentStore = create((set) => ({
  applicantDetails: null,
  currMainFormData: null,
  currSubFormData: null,
  subFormDataList: [],
  requesterComments: '',
  setApplicantDetails: (applicantDetails) =>
    set(() => ({ applicantDetails: applicantDetails })),
  setCurrMainFormData: (currMainFormData) =>
    set(() => ({ currMainFormData: currMainFormData })),
  setCurrSubFormData: (currSubFormData) =>
    set(() => ({ currSubFormData: currSubFormData })),
  resetCurrSubFormData: () =>
    set(() => ({ currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE })),
  setSubFormDataList: (subFormDataList) =>
    set(() => ({ subFormDataList: subFormDataList })),
  resetStore: () =>
    set(() => ({
      currMainFormData: null,
      currSubFormData: null,
      applicantDetails: null,
      subFormDataList: []
    }))
}));
