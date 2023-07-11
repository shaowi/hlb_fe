export const currentDate = new Date().toJSON().slice(0, 10);
export const previousMonthDate = new Date(
  new Date().setMonth(new Date().getMonth() - 1)
)
  .toJSON()
  .slice(0, 10);

// Select dropdown options
export const STATUSES = {
  all: 'ALL',
  rejected: 'REJECTED',
  failed: 'FAILED',
  declined: 'DECLINED',
  pending: 'PENDING REVIEW'
};

export const DEBIT_TYPE = {
  single: 'Single Debit',
  multiple: 'Multiple Debit'
};

export const RESIDENT_CODE = {
  resident: 'Resident',
  nonResident: 'Non-Resident'
};

export const CHARGE_BEARER = {
  OUR: 'OUR',
  BEN: 'BEN',
  SHA: 'SHA'
};

export const RECEIVER_CORRESPONDENT = {
  receiverCorrespondent1: 'Receiver Correspondent 1',
  receiverCorrespondent2: 'Receiver Correspondent 2',
  receiverCorrespondent3: 'Receiver Correspondent 3'
};

export const TRANSACTION_PURPOSE_CODE = {
  transactionPurposeCode1: 'Transaction Purpose Code 1',
  transactionPurposeCode2: 'Transaction Purpose Code 2',
  transactionPurposeCode3: 'Transaction Purpose Code 3'
};

// ----

// Select2 dropdown options
export const COUNTRY_CODE = [
  { label: 'AU - Australia', value: 'AU' },
  { label: 'CN - China', value: 'CN' },
  { label: 'SG - Singapore', value: 'SG' }
];

export const COUNTRY_CODE_TO_LABEL = {
  AU: 'AU - Australia',
  CN: 'CN - China',
  SG: 'SG - Singapore'
};

export const REMITTANCE_CURRENCY = [
  { label: 'AUD', value: 'AUD' },
  { label: 'USD', value: 'USD' },
  { label: 'SGD', value: 'SGD' }
];

export const ACCOUNT_BIC = [
  { label: 'ANZBAU3M', value: 'ANZBAU3M' },
  { label: 'ANZBAU3MXXX', value: 'ANZBAU3MXXX' },
  { label: 'BNZBAU3MXXX', value: 'BNZBAU3MXXX' },
  { label: 'CATHHKH0XXX', value: 'CATHHKH0XXX' }
];
// ----

export const FILENAME_FORMAT =
  'Filename should be in the format of OPFR+yyyyMMdd+7 digits of running number per day. E.g.: OPFR202306210000001.csv';

export const REJECTED_PAYMENT_FILE = 'Rejected Payment File';
export const UPLOAD_PAYMENT_FILE = 'Upload Payment File';
export const CREATE_PAYMENT_FILE = 'Create Payment File';
