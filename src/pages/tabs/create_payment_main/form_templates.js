import * as Yup from 'yup';

const currentDate = new Date().toJSON().slice(0, 10);

// TODO: Clear data later (Mock data used for testing only)
export const APPLICANT_DETAILS = {
  applicantName: 'John Doe',
  applicantAccountNo: '9000000001',
  applicantAccountType: 'Current',
  applicantAccountCurrency: 'AUD',
  applicantIdType: 'New IC',
  applicantId: 'applicantId',
  applicantAccountBranchCode: '90',
  applicantBankBic: 'HLBBSGS0XXX',
  applicantResidentCode: 'resident',
  applicantAccountCifId: 'applicantAccountCifId',
  applicantPhone: '12345678',
  applicantPostalCode: '123456',
  applicantAddress1: 'applicantAddress1',
  applicantAddress2: 'applicantAddress2',
  applicantAddress3: 'applicantAddress3',
  applicantCountryCode: { label: 'AU - Australia', value: 'AU' }
  // applicantCountryCode: { label: '', value: '' }
};

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

export const SUB_FILE_DETAILS = {
  debitType: 'single',
  transactionType: 'transactionType',
  processingMode: 'processingMode'
};

export const SUB_FILE_DETAILS_VALIDATION = {
  debitType: Yup.string(),
  transactionType: Yup.string(),
  processingMode: Yup.string()
};

export const MAIN_FILE_DETAILS = {
  filename: `OPFR${currentDate.replace(/-/g, '')}0000001.csv`,
  debitType: 'single',
  channelTransactionReference: '2317333701OPZ00100',
  transactionType: 'ISS 1-M CBFT Credit Transfer (MT103)',
  requestChannel: 'PG BizOpsUI',
  transactionDate: currentDate,
  valueDate: currentDate,
  businessDate: currentDate,
  recipientReference: 'recipientReference',
  otherPaymentDetails: 'otherPaymentDetails'
};

export const MAIN_FILE_DETAILS_VALIDATION = {
  filename: Yup.string().required('Filename is required'),
  debitType: Yup.string().required('Debit Type is required'),
  channelTransactionReference: Yup.string(),
  transactionType: Yup.string(),
  requestChannel: Yup.string(),
  transactionDate: Yup.date(),
  valueDate: Yup.date().required('Value Date is required'),
  businessDate: Yup.date().required('Business Date is required'),
  recipientReference: Yup.string(),
  otherPaymentDetails: Yup.string()
};

export const BENEFICIARY_DETAILS = {
  beneficiaryName: 'Khanh Nguyen',
  beneficiaryAccountNo: '1234567890',
  beneficiaryIdType: 'Passport',
  beneficiaryId: '72843',
  beneficiaryResidentCode: 'resident',
  beneficiaryAccountBic: { label: 'CATHHKH0XXX', value: 'CATHHKH0XXX' },
  beneficiaryBankName: 'Cathay Bank',
  beneficiaryBankCountryCode: 'HK',
  beneficiaryBankAddress1: 'beneficiaryBankAddress1',
  beneficiaryBankAddress2: 'beneficiaryBankAddress2',
  beneficiaryBankAddress3: 'beneficiaryBankAddress3',
  beneficiaryAddress1: 'beneficiaryAddress1',
  beneficiaryAddress2: 'beneficiaryAddress2',
  beneficiaryAddress3: 'beneficiaryAddress3',
  beneficiaryCountryCode: { label: 'AU - Australia', value: 'AU' }
};

export const BENEFICIARY_DETAILS_VALIDATION = {
  beneficiaryName: Yup.string().required('Name is required'),
  beneficiaryAccountNo: Yup.number().required('Account No is required'),
  beneficiaryIdType: Yup.string(),
  beneficiaryId: Yup.string(),
  beneficiaryResidentCode: Yup.string().required('Resident Code is required'),
  beneficiaryBankName: Yup.string(),
  beneficiaryBankCountryCode: Yup.string(),
  beneficiaryBankAddress1: Yup.string(),
  beneficiaryBankAddress2: Yup.string(),
  beneficiaryBankAddress3: Yup.string(),
  beneficiaryAddress1: Yup.string().required('Address 1 is required'),
  beneficiaryAddress2: Yup.string().required('Address 2 is required'),
  beneficiaryAddress3: Yup.string()
};

export const PAYMENT_DETAILS = {
  remittanceCurrency: { label: 'AUD', value: 'AUD' },
  remittanceAmount: 500,
  fxContractReferenceNo: 'fxContractReferenceNo',
  exchangeRate: 1.564,
  creditingFxRate: 0.89234,
  debitingFxRate: 0.89234,
  paymentCurrency: 'AUD',
  paymentAmount: 500,
  localEquivalentAmount: 530
};

export const PAYMENT_DETAILS_VALIDATION = {
  remittanceAmount: Yup.number().required('Remittance Amount is required'),
  fxContractReferenceNo: Yup.string(),
  exchangeRate: Yup.number(),
  creditingFxRate: Yup.number(),
  debitingFxRate: Yup.number(),
  paymentCurrency: Yup.string(),
  paymentAmount: Yup.number(),
  localEquivalentAmount: Yup.number()
};

export const CHARGES_DETAILS = {
  creditMidRate: 0.90234,
  debitMidRate: 0.90234,
  chargeBearer: 'OUR',
  commissionInLieuOfExchange: 45,
  commissionHandling: 30
};

export const CHARGES_DETAILS_VALIDATION = {
  creditMidRate: Yup.number(),
  debitMidRate: Yup.number(),
  chargeBearer: Yup.string().required('Charge Bearer is required'),
  commissionInLieuOfExchange: Yup.number()
};

export const CORRESPONDENT_BANK_DETAILS = {
  sendersCorrespondent: 'ANZBAU30XXX',
  receiversCorrespondent: 'receiverCorrespondent1'
};

export const CORRESPONDENT_BANK_DETAILS_VALIDATION = {
  sendersCorrespondent: Yup.string().required(
    "Sender's Correspondent is required"
  ),
  receiversCorrespondent: Yup.string().required(
    "Receiver's Correspondent is required"
  )
};

export const TRANSACTION_DETAILS = {
  channelTransactionReference: '2317433323OPZ00100',
  recipientReference: 'recipientReference',
  purposeCode: 'transactionPurposeCode1',
  remittanceInfo: 'remittanceInfo',
  additionalRemittanceInfo: 'additionalRemittanceInfo',
  senderToReceiverInfo: 'senderToReceiverInfo',
  additionalSenderToReceiverInfo: 'additionalSenderToReceiverInfo',
  otherPaymentDetails: 'otherPaymentDetails',
  additionalRemarks: 'additionalRemarks'
};

export const TRANSACTION_DETAILS_VALIDATION = {
  channelTransactionReference: Yup.string(),
  recipientReference: Yup.string(),
  purposeCode: Yup.string(),
  remittanceInfo: Yup.string(),
  additionalRemittanceInfo: Yup.string(),
  senderToReceiverInfo: Yup.string(),
  additionalSenderToReceiverInfo: Yup.string(),
  otherPaymentDetails: Yup.string(),
  additionalRemarks: Yup.string()
};
