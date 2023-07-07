import {
  MAIN_FILE_DETAILS,
  APPLICANT_DETAILS
} from 'pages/tabs/form_templates';
import { INITIAL_PAYMENT_SUB_FORM_STATE } from './../pages/tabs/create_payment_main/create_payment_store';

// TODO: Remove this mock data and implement the actual API call
export async function getFileDetails(id) {
  const mainFileData = new Promise((resolve, _) => resolve(MAIN_FILE_DETAILS));
  const applicantData = new Promise((resolve, _) => resolve(APPLICANT_DETAILS));
  const subFormData = new Promise((resolve, _) =>
    resolve(INITIAL_PAYMENT_SUB_FORM_STATE)
  );
  const subFormDataList = new Promise((resolve, _) => resolve([]));
  return Promise.all([
    mainFileData,
    applicantData,
    subFormData,
    subFormDataList
  ]);
}

export async function createPaymentFile() {
  return new Promise((resolve, _) => resolve('success'));
}
