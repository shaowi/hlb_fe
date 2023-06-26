import { create } from 'zustand';
import {
  APPLICANT_DETAILS,
  PAYMENT_INITIAL_SUB_FORM_STATE
} from './form_templates';

export const useCreatePaymentStore = create((set) => ({
  applicantDetails: APPLICANT_DETAILS,
  currSubFormData: PAYMENT_INITIAL_SUB_FORM_STATE,
  subFormDataList: [PAYMENT_INITIAL_SUB_FORM_STATE],
  setApplicantDetails: (applicantDetails) =>
    set(() => ({ applicantDetails: applicantDetails })),
  setCurrSubFormData: (currSubFormData) =>
    set(() => ({ currSubFormData: currSubFormData })),
  setSubFormDataList: (subFormDataList) =>
    set(() => ({ subFormDataList: subFormDataList }))
}));
