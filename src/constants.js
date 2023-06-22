import * as Yup from 'yup';

// Select dropdown options
export const DEBIT_TYPE = {
  single: 'Single Debit',
  multiple: 'Multiple Debit'
};

export const RESIDENT_CODE = {
  resident: 'Resident',
  nonResident: 'Non-Resident'
};

// Select2 dropdown options
export const COUNTRY_CODE = [
  { label: 'AU - Australia', value: 'AU' },
  { label: 'CN - China', value: 'CN' },
  { label: 'SG - Singapore', value: 'SG' }
];

export const REMITTANCE_CURRENCY = [
  { label: 'AUD', value: 'AUD' },
  { label: 'USD', value: 'USD' },
  { label: 'SGD', value: 'SGD' }
];

export const FILENAME_FORMAT =
  'Filename should be in the format of OPFR+yyyyMMdd+7 digits of running number per day. E.g.: OPFR202306210000001.csv';

export const APPLICANT_DETAILS_VALIDATION = {
  applicantName: Yup.string().required('Name is required'),
  applicantAccountNo: Yup.number().required('Account No is required'),
  applicantAccountType: Yup.string().required('Account Type is required'),
  applicantAccountCurrency: Yup.string().required(
    'Account Currency is required'
  ),
  applicantIdType: Yup.string(),
  applicantId: Yup.string(),
  applicantAccountBranchCode: Yup.string().required(
    'Account Branch Code is required'
  ),
  applicantBankBic: Yup.string(),
  applicantResidentCode: Yup.string().required('Resident Code is required'),
  applicantAccountCifId: Yup.string(),
  applicantPhone: Yup.number().integer().typeError('Phone must be a number'),
  applicantPostalCode: Yup.string(),
  applicantAddress1: Yup.string().required('Address 1 is required'),
  applicantAddress2: Yup.string(),
  applicantAddress3: Yup.string()
};
