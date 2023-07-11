import { COUNTRY_CODE_TO_LABEL } from 'constants';
import {
  CREATE_ONLINE_CBFT_URL,
  ONLINE_CBFT_URL,
  GET_ALL_ONLINE_CBFT_URL
} from 'endpoints';
import { getRequest, postRequest } from './HttpRequests';

export async function getFileDetails(filename) {
  const response = await getRequest(ONLINE_CBFT_URL, { filename });
  if (response.status !== 200) {
    return new Error('Error in fetching file details');
  }
  const transactionList = response.data;
  if (transactionList.length === 0) {
    return new Error('No transactions found');
  }
  const mainFileData = mapToMainFileData(transactionList);
  const applicantData = mapToApplicantData(transactionList);
  const subFormDataList = mapToSubFormDataList(applicantData, transactionList);

  console.log('mainFileData', mainFileData);
  console.log('applicantData', applicantData);
  console.log('subFormDataList', subFormDataList);

  return [mainFileData, applicantData, subFormDataList];
}

function mapToMainFileData(transactionList) {
  const {
    filename,
    debitType,
    channelTransactionReference,
    transactionType,
    requestChannel,
    transactionDate,
    valueDate,
    businessDate,
    recipientReference,
    otherPaymentDetails
  } = transactionList[0];
  return {
    filename,
    debitType,
    channelTransactionReference,
    transactionType,
    requestChannel,
    transactionDate,
    valueDate,
    businessDate,
    recipientReference,
    otherPaymentDetails
  };
}

function mapToApplicantData(transactionList) {
  const applicant = transactionList[0].applicant;
  const {
    id,
    idType,
    name,
    accountNumber,
    isResident,
    bankBic,
    addresses,
    accountType,
    accountCurrency,
    accountCifId,
    branchCode,
    postalCode,
    countryCode,
    phoneNumber
  } = applicant;
  const [applicantAddress1, applicantAddress2, applicantAddress3] =
    addresses.split(',');

  return {
    applicantName: name,
    applicantAccountNo: accountNumber,
    applicantAccountType: accountType,
    applicantAccountCurrency: {
      label: accountCurrency,
      value: accountCurrency
    },
    applicantIdType: idType,
    applicantId: id,
    applicantAccountBranchCode: branchCode,
    applicantBankBic: bankBic,
    applicantResidentCode: isResident ? 'resident' : 'nonResident',
    applicantAccountCifId: accountCifId,
    applicantPhone: phoneNumber,
    applicantPostalCode: postalCode,
    applicantAddress1,
    applicantAddress2,
    applicantAddress3,
    applicantCountryCode: {
      label: COUNTRY_CODE_TO_LABEL[countryCode],
      value: countryCode
    }
  };
}

function mapToSubFormDataList(applicantDetails, transactionList) {
  return transactionList.map((transaction) => {
    const {
      beneficiary,
      processingMode,
      transactionType,
      sendersCorrespondent,
      receiversCorrespondent,
      channelTransactionReference,
      recipientReference,
      purposeOfPayment,
      remittanceInfo,
      additionalRemittanceInfo,
      senderToReceiverInfo,
      additionalSenderToReceiverInfo,
      otherPaymentDetails,
      foreignPaymentForm,
      debitType,
      creditMidRate,
      debitMidRate,
      chargeBearer,
      commissionInLieuOfExchange,
      commissionHandle
    } = transaction;
    const subFileDetails = { debitType, transactionType, processingMode };
    const beneficiaryDetails = mapToBeneficiaryData(beneficiary);
    const foreignPaymentDetails = mapToForeignPaymentData(foreignPaymentForm);
    const chargesDetail = {
      creditMidRate,
      debitMidRate,
      chargeBearer,
      commissionInLieuOfExchange,
      commissionHandle
    };
    const correspondentBankDetails = {
      sendersCorrespondent,
      receiversCorrespondent
    };
    const transactionDetails = {
      channelTransactionReference,
      recipientReference,
      purposeCode: purposeOfPayment,
      remittanceInfo,
      additionalRemittanceInfo,
      senderToReceiverInfo,
      additionalSenderToReceiverInfo,
      otherPaymentDetails,
      additionalRemarks: ''
    };
    return {
      ...subFileDetails,
      ...applicantDetails,
      ...beneficiaryDetails,
      ...foreignPaymentDetails,
      ...chargesDetail,
      ...correspondentBankDetails,
      ...transactionDetails
    };
  });
}

function mapToBeneficiaryData(beneficiary) {
  const {
    id,
    idType,
    name,
    accountNumber,
    isResident,
    bankBic,
    addresses,
    bankAddresses,
    bankName,
    bankCountryCode,
    countryCode
  } = beneficiary;
  const [beneficiaryAddress1, beneficiaryAddress2, beneficiaryAddress3] =
    addresses.split(',');
  const [
    beneficiaryBankAddress1,
    beneficiaryBankAddress2,
    beneficiaryBankAddress3
  ] = bankAddresses.split(',');
  return {
    beneficiaryName: name,
    beneficiaryAccountNo: accountNumber,
    beneficiaryIdType: idType,
    beneficiaryId: id,
    beneficiaryResidentCode: isResident ? 'resident' : 'non-resident',
    beneficiaryAccountBic: { label: bankBic, value: bankBic },
    beneficiaryBankName: bankName,
    beneficiaryBankCountryCode: bankCountryCode,
    beneficiaryBankAddress1,
    beneficiaryBankAddress2,
    beneficiaryBankAddress3,
    beneficiaryAddress1,
    beneficiaryAddress2,
    beneficiaryAddress3,
    beneficiaryCountryCode: {
      label: COUNTRY_CODE_TO_LABEL[countryCode],
      value: countryCode
    }
  };
}

function mapToForeignPaymentData(form) {
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
  } = form;
  return {
    remittanceCurrency: {
      label: remittanceCurrency,
      value: remittanceCurrency
    },
    remittanceAmount,
    fxContractReferenceNo,
    exchangeRate,
    creditFxRate,
    debitFxRate,
    paymentCurrency,
    paymentAmount,
    localEquivalentAmount
  };
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
      accountCurrency: applicantAccountCurrency.value,
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
      fxContractReferenceNo,
      exchangeRate,
      creditFxRate,
      debitFxRate
    }
  };
}

export function mapToPaymentPayload(mainFormData, subFormData) {
  const {
    processingMode,
    sendersCorrespondent,
    receiversCorrespondent,
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
  const { channelTransactionReference } = mainFormData;
  const subFormPayload = {
    processingMode,
    sendersCorrespondent,
    receiversCorrespondent,
    channelTransactionReference,
    purposeOfPayment: purposeCode,
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
  };
  return { ...mainFormData, ...subFormPayload };
}

export async function getRejectedPaymentFiles() {
  const response = await getRequest(GET_ALL_ONLINE_CBFT_URL);
  if (response.status !== 200) {
    return new Error('Error in fetching rejected payments');
  }
  const transactions = response.data;
  const files = {};
  transactions.forEach((transaction) => {
    const { filename } = transaction;
    if (!files[filename]) {
      files[filename] = [];
    }
    files[filename].push(transaction);
  });
  return files;
}
