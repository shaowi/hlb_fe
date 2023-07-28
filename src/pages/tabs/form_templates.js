import { currentDate } from 'constant';

// TODO: Clear data later (Mock data used for testing only)
const debitType = 'single';
const transactionType = 'ISS 1-M CBFT Credit Transfer (MT103)';
const channelTransactionReference = '2317433323OPZ00100';
export const APPLICANT_DETAILS = {
  applicantDbId: -1, // id used to identify the file to be updated in database
  applicantName: '',
  applicantAccountNumber: '',
  applicantAccountType: '',
  applicantAccountCurrency: { label: '', value: '' },
  applicantIdType: '',
  applicantId: '',
  applicantAccountBranchCode: '',
  applicantBankBic: 'HLBBSGS0XXX',
  applicantResidentCode: '',
  applicantAccountCifId: '',
  applicantPhone: '',
  applicantPostalCode: '',
  applicantAddress1: '',
  applicantAddress2: '',
  applicantAddress3: '',
  applicantCountryCode: { label: '', value: '' }
};

export const SUB_FILE_DETAILS = {
  id: -1, // id used to identify the file to be updated in database
  debitType,
  transactionType,
  processingMode: 'processingMode'
};

export const MAIN_FILE_DETAILS = {
  status: '',
  filename: `OPFR${currentDate.replace(/-/g, '')}0000001.csv`,
  debitType,
  channelTransactionReference,
  transactionType,
  requestChannel: 'PG BizOpsUI',
  transactionDate: currentDate,
  valueDate: currentDate,
  businessDate: currentDate,
  recipientReference: '',
  otherPaymentDetails: ''
};

export const BENEFICIARY_DETAILS = {
  beneficiaryDbId: -1, // id used to identify the file to be updated in database
  beneficiaryName: '',
  beneficiaryAccountNumber: '',
  beneficiaryIdType: '',
  beneficiaryId: '',
  beneficiaryResidentCode: '',
  beneficiaryAccountBic: { label: '', value: '' },
  beneficiaryBankName: 'Cathay Bank',
  beneficiaryBankCountryCode: 'HK',
  beneficiaryBankAddress1: '',
  beneficiaryBankAddress2: '',
  beneficiaryBankAddress3: '',
  beneficiaryAddress1: '',
  beneficiaryAddress2: '',
  beneficiaryAddress3: '',
  beneficiaryCountryCode: { label: '', value: '' }
};

export const PAYMENT_DETAILS = {
  paymentId: -1, // id used to identify the file to be updated in database
  remittanceCurrency: { label: '', value: '' },
  remittanceAmount: '',
  fxContractReferenceNo: '3478784732',
  exchangeRate: 1.564,
  creditFxRate: 0.89234,
  debitFxRate: 0.89234,
  paymentCurrency: 'AUD',
  paymentAmount: '',
  localEquivalentAmount: ''
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
  channelTransactionReference,
  recipientReference: '',
  purposeCode: '',
  remittanceInfo: '',
  additionalRemittanceInfo: '',
  senderToReceiverInfo: '',
  additionalSenderToReceiverInfo: '',
  otherPaymentDetails: '',
  additionalRemarks: ''
};

export const TRANSACTION_SUMMARY = {
  requesterComments: '',
  reviewerComments: ''
};
