import { currentDate } from 'constant';

// TODO: Clear data later (Mock data used for testing only)
const debitType = 'single';
export const APPLICANT_DETAILS = {
  applicantDbId: -1, // id used to identify the file to be updated in database
  applicantName: '',
  applicantAccountNumber: '',
  applicantAccountType: '',
  applicantAccountCurrency: { label: '', value: '' },
  applicantIdType: '',
  applicantId: '',
  applicantAccountBranchCode: '',
  applicantBankBic: '',
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
  transactionType: '',
  processingMode: ''
};

export const MAIN_FILE_DETAILS = {
  status: '',
  filename: `OPFR${currentDate.replace(/-/g, '')}0000001.csv`,
  debitType,
  channelTransactionReference: '',
  transactionType: '',
  requestChannel: '',
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
  beneficiaryBankName: '',
  beneficiaryBankCountryCode: '',
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
  fxContractReferenceNo: '',
  exchangeRate: '',
  creditFxRate: '',
  debitFxRate: '',
  paymentCurrency: '',
  paymentAmount: '',
  localEquivalentAmount: ''
};

export const CHARGES_DETAILS = {
  creditMidRate: '',
  debitMidRate: '',
  chargeBearer: '',
  commissionInLieuOfExchange: '',
  commissionHandle: ''
};

export const CORRESPONDENT_BANK_DETAILS = {
  sendersCorrespondent: '',
  receiversCorrespondent: ''
};

export const TRANSACTION_DETAILS = {
  channelTransactionReference: '',
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
