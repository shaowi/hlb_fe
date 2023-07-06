import { create } from 'zustand';
import {
  MAIN_FILE_DETAILS,
  APPLICANT_DETAILS,
  BENEFICIARY_DETAILS,
  CHARGES_DETAILS,
  CORRESPONDENT_BANK_DETAILS,
  PAYMENT_DETAILS,
  SUB_FILE_DETAILS,
  TRANSACTION_DETAILS
} from '../form_templates';

export const INITIAL_PAYMENT_SUB_FORM_STATE = {
  ...SUB_FILE_DETAILS,
  ...APPLICANT_DETAILS,
  ...BENEFICIARY_DETAILS,
  ...PAYMENT_DETAILS,
  ...CHARGES_DETAILS,
  ...CORRESPONDENT_BANK_DETAILS,
  ...TRANSACTION_DETAILS
};

export const useCreatePaymentStore = create((set) => ({
  applicantDetails: APPLICANT_DETAILS,
  currMainFormData: MAIN_FILE_DETAILS,
  currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE,
  subFormDataList: [],
  requesterComments: 'requester comments',
  setApplicantDetails: (applicantDetails) =>
    set(() => ({ applicantDetails: applicantDetails })),
  setCurrSubFormData: (currSubFormData) =>
    set(() => ({ currSubFormData: currSubFormData })),
  resetCurrSubFormData: () =>
    set(() => ({ currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE })),
  setSubFormDataList: (subFormDataList) =>
    set(() => ({ subFormDataList: subFormDataList })),
  setRequesterComments: (requesterComments) =>
    set(() => ({ requesterComments: requesterComments }))
}));
