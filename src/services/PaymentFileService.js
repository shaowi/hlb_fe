import {
  MAIN_FILE_DETAILS,
  APPLICANT_DETAILS
} from 'pages/tabs/form_templates';
import { INITIAL_PAYMENT_SUB_FORM_STATE } from './../pages/tabs/create_payment_main/create_payment_store';
import { postRequest } from './HttpRequests';
import { CREATE_ONLINE_CBFT_URL } from 'endpoints';

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

export function createPaymentFile(payload) {
  return postRequest(CREATE_ONLINE_CBFT_URL, payload);
}

export function mapToApplicantPayload(applicantDetails) {
  const {
    applicantName,
    applicantAccountNo,
    applicantAccountType,
    applicantAccountCurrency,
    applicantIdType,
    applicantAccountBranchCode,
    applicantBankBic,
    applicantResidentCode,
    applicantAccountCifId,
    applicantPhone,
    applicantPostalCode,
    applicantAddress1,
    applicantAddress2,
    applicantAddress3,
    applicantCountryCode
  } = applicantDetails;
  const addresses = `${applicantAddress1},${applicantAddress2},${applicantAddress3}`;

  return {
    applicant: {
      idType: applicantIdType,
      name: applicantName,
      accountNumber: applicantAccountNo,
      isResident: applicantResidentCode === 'resident',
      bankBic: applicantBankBic,
      addresses,
      accountType: applicantAccountType,
      accountCurrency: applicantAccountCurrency,
      accountCifId: applicantAccountCifId,
      branchCode: applicantAccountBranchCode,
      postalCode: applicantPostalCode,
      countryCode: applicantCountryCode.value,
      phoneNumber: applicantPhone
    }
  };
}

export function mapToBeneficiaryPayload(subFormData) {
  const {
    beneficiaryName,
    beneficiaryAccountNo,
    beneficiaryIdType,
    beneficiaryResidentCode,
    beneficiaryAccountBic,
    beneficiaryBankName,
    beneficiaryBankCountryCode,
    beneficiaryBankAddress1,
    beneficiaryBankAddress2,
    beneficiaryBankAddress3,
    beneficiaryAddress1,
    beneficiaryAddress2,
    beneficiaryAddress3,
    beneficiaryCountryCode
  } = subFormData;
  const addresses = `${beneficiaryAddress1},${beneficiaryAddress2},${beneficiaryAddress3}`;
  const bankAddresses = `${beneficiaryBankAddress1},${beneficiaryBankAddress2},${beneficiaryBankAddress3}`;
  return {
    beneficiary: {
      idType: beneficiaryIdType,
      name: beneficiaryName,
      accountNumber: beneficiaryAccountNo,
      isResident: beneficiaryResidentCode === 'resident',
      bankBic: beneficiaryAccountBic.value,
      addresses,
      bankAddresses,
      bankName: beneficiaryBankName,
      bankCountryCode: beneficiaryBankCountryCode,
      countryCode: beneficiaryCountryCode.value
    }
  };
}

export function mapToForeignPaymentPayload(subFormData) {
  const {
    remittanceCurrency,
    remittanceAmount,
    paymentCurrency,
    paymentAmount,
    localEquivalentAmount,
    fxContractReferenceNo,
    exchangeRate,
    creditFxRate,
    debitFxRate
  } = subFormData;
  return {
    foreignPaymentForm: {
      remittanceCurrency: remittanceCurrency.value,
      remittanceAmount,
      paymentCurrency,
      paymentAmount,
      localEquivalentAmount,
      fxRefNumber: fxContractReferenceNo,
      exchangeRate,
      creditFxRate,
      debitFxRate
    }
  };
}

export function mapToPaymentPayload(mainFormData, subFormData) {
  const {
    transactionType,
    requestChannel,
    transactionDate,
    valueDate,
    businessDate,
    recipientReference,
    otherPaymentDetails
  } = mainFormData;
  const {
    sendersCorrespondent,
    receiversCorrespondent,
    channelTransactionReference,
    purposeCode,
    remittanceInfo,
    additionalRemittanceInfo,
    senderToReceiverInfo,
    additionalSenderToReceiverInfo,
    requesterComments,
    creditMidRate,
    debitMidRate,
    chargeBearer,
    commissionInLieuOfExchange,
    commissionHandle
  } = subFormData;
  const mainFormPayload = {
    transactionDate,
    transactionType,
    requestChannel,
    valueDate,
    businessDate,
    recipientRef: recipientReference,
    otherPaymentDetails
  };
  const subFormPayload = {
    sendersCorrespondent,
    receiversCorrespondent,
    channelTransactionRef: channelTransactionReference,
    purposeOfPayment: purposeCode,
    remittanceInfo,
    addRemittanceInfo: additionalRemittanceInfo,
    senderToReceiverInfo,
    addSenderToReceiverInfo: additionalSenderToReceiverInfo,
    requesterComments,
    creditMidRate,
    debitMidRate,
    chargeBearer,
    commissionExchange: commissionInLieuOfExchange,
    commissionHandle
  };
  return { ...mainFormPayload, ...subFormPayload };
}
