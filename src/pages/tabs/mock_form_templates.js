import { currentDate } from 'constant';

// FIXME: Mock data used for testing only
const debitType = 'single';
export const APPLICANT_DETAILS = {
  applicantDbId: -1, // id used to identify the file to be updated in database
  applicantName: 'John',
  applicantAccountNumber: '9000000001',
  applicantAccountType: 'Current',
  applicantAccountCurrency: { label: 'SGD', value: 'SGD' },
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
  applicantCountryCode: { label: '', value: '' }
};

export const SUB_FILE_DETAILS = {
  id: -1, // id used to identify the file to be updated in database
  debitType,
  transactionType: 'ISS 1-M CBFT Credit Transfer (MT103)',
  processingMode: 'processingMode'
};

export const MAIN_FILE_DETAILS = {
  status: '',
  filename: `OPFR${currentDate.replace(/-/g, '')}0000001.csv`,
  debitType,
  channelTransactionReference: '2317333701OPZ00100',
  transactionType: 'ISS 1-M CBFT Credit Transfer (MT103)',
  requestChannel: 'PG BizOpsUI',
  transactionDate: currentDate,
  valueDate: currentDate,
  businessDate: currentDate,
  recipientReference: 'recipientReference',
  otherPaymentDetails: 'otherPaymentDetails'
};

export const BENEFICIARY_DETAILS = {
  beneficiaryDbId: -1, // id used to identify the file to be updated in database
  beneficiaryName: 'Tim',
  beneficiaryAccountNumber: '1234567890',
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

export const PAYMENT_DETAILS = {
  paymentId: -1, // id used to identify the file to be updated in database
  remittanceCurrency: { label: 'AUD', value: 'AUD' },
  remittanceAmount: 500,
  fxContractReferenceNo: 'fxContractReferenceNo',
  exchangeRate: 1.564,
  creditFxRate: 0.89234,
  debitFxRate: 0.89234,
  paymentCurrency: 'AUD',
  paymentAmount: 700,
  localEquivalentAmount: 530
};

export const CHARGES_DETAILS = {
  creditMidRate: 0.90234,
  debitMidRate: 0.90234,
  chargeBearer: 'OUR',
  commissionInLieuOfExchange: 45,
  commissionHandle: 30
};

export const CORRESPONDENT_BANK_DETAILS = {
  sendersCorrespondent: 'ANZBAU30XXX',
  receiversCorrespondent: 'receiverCorrespondent1'
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

export const TRANSACTION_SUMMARY = {
  requesterComments: 'requesterComments',
  reviewerComments: ''
};
