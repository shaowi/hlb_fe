import { COUNTRY_CODE_TO_LABEL } from 'constants';
import {
  CREATE_ONLINE_CBFT_URL,
  UPDATE_ONLINE_CBFT_URL,
  ONLINE_CBFT_URL,
  GET_ALL_ONLINE_CBFT_URL
} from 'endpoints';
import { getRequest, postRequest } from './HttpRequests';

/**
 * The function `getFileDetails` fetches file details from an online source, maps the data to different categories, and
 * returns an array containing the main file data, applicant data, sub-form data list, and requester comments.
 * @param filename - The filename parameter is the name of the file for which you want to fetch the details.
 * @returns an array containing the following elements:
 * 1. mainFileData: The main file data mapped from the transaction list.
 * 2. applicantData: The applicant data mapped from the transaction list.
 * 3. subFormDataList: A list of sub-form data mapped from the applicant data and transaction list.
 * 4. requesterComments: The requester comments from the first transaction in the transaction list.
 */
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

  return [
    mainFileData,
    applicantData,
    subFormDataList,
    transactionList[0].requesterComments
  ];
}

/**
 * The function `mapToMainFileData` takes in a list of transactions and returns an object containing the main file data of
 * the first transaction in the list.
 * @param transactionList - An array of objects representing a list of transactions. Each object in the array contains the
 * following properties:
 * @returns an object with properties that are extracted from the first element of the transactionList array. The
 * properties being returned are id, filename, debitType, channelTransactionReference, transactionType, requestChannel,
 * transactionDate, valueDate, businessDate, recipientReference, and otherPaymentDetails.
 */
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

/**
 * The function `mapToApplicantData` takes a transaction list and extracts relevant information about the applicant,
 * returning it in a formatted object.
 * @param transactionList - An array of transaction objects. Each transaction object contains information about an
 * applicant, including their ID, name, account number, address, etc.
 * @returns an object with various properties related to the applicant's data.
 */
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
    applicantDbId: id,
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

/**
 * The function `mapToSubFormDataList` takes in applicant details and a list of transactions, and maps each transaction to
 * a sub-form data object.
 * @param applicantDetails - An object containing details about the applicant. It could include properties such as
 * applicantName, applicantAddress, applicantPhone, etc.
 * @param transactionList - An array of transaction objects. Each transaction object contains various properties such as
 * beneficiary, processingMode, transactionType, sendersCorrespondent, receiversCorrespondent, channelTransactionReference,
 * recipientReference, purposeOfPayment, remittanceInfo, additionalRemittanceInfo, senderToReceiverInfo, additionalSender
 * @returns an array of objects. Each object in the array represents a transaction and contains various details related to
 * the transaction, such as beneficiary details, foreign payment details, charges details, correspondent bank details, and
 * transaction details.
 */
function mapToSubFormDataList(applicantDetails, transactionList) {
  return transactionList.map((transaction) => {
    const {
      id,
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
    const subFileDetails = { id, debitType, transactionType, processingMode };
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

/**
 * The function `mapToBeneficiaryData` takes a `beneficiary` object and maps its properties to a new object with specific
 * key-value pairs.
 * @param beneficiary - The `beneficiary` parameter is an object that contains the following properties:
 * @returns an object with various properties that map to the properties of the input beneficiary object.
 */
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
    beneficiaryDbId: id,
    beneficiaryName: name,
    beneficiaryAccountNo: accountNumber,
    beneficiaryIdType: idType,
    beneficiaryId: id,
    beneficiaryResidentCode: isResident ? 'resident' : 'nonResident',
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

/**
 * The function `mapToForeignPaymentData` takes in a form object and maps its properties to a new object with specific
 * key-value pairs.
 * @param form - The `form` parameter is an object that contains the following properties:
 * @returns an object with the following properties:
 */
function mapToForeignPaymentData(form) {
  const {
    id,
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
    paymentId: id,
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

/**
 * The function creates a payment transaction by making a POST request to a specified URL with a payload.
 * @param payload - The payload parameter is an object that contains the necessary data for creating a payment transaction.
 * It could include information such as the amount to be paid, the recipient's account details, and any additional metadata
 * required for the transaction.
 * @returns the result of the postRequest function, which is the response from the API call made to the
 * CREATE_ONLINE_CBFT_URL with the given payload.
 */
export function createPaymentTransaction(payload) {
  return postRequest(CREATE_ONLINE_CBFT_URL, payload);
}

/**
 * The function `updatePaymentTransaction` sends a POST request to a specified URL with a payload.
 * @param payload - The payload parameter is an object that contains the data to be sent in the request body. It typically
 * includes information such as the payment transaction details that need to be updated.
 * @returns the result of the postRequest function, which is the response from the UPDATE_ONLINE_CBFT_URL endpoint after
 * sending the payload.
 */
export function updatePaymentTransaction(payload) {
  return postRequest(UPDATE_ONLINE_CBFT_URL, payload);
}

/**
 * The function `mapToApplicantPayload` takes in applicant details and an optional ID, and returns a payload object with
 * the mapped properties.
 * @param applicantDetails - An object containing the details of an applicant. It includes the following properties:
 * @param [id=null] - The unique identifier for the applicant (optional). Used to update the applicant in database.
 * @returns an object with a property called "applicant". The value of "applicant" is an object that contains various
 * properties such as "id", "idType", "name", "accountNumber", "isResident", "bankBic", "addresses", "accountType",
 * "accountCurrency", "accountCifId", "branchCode", "postalCode", "countryCode
 */
export function mapToApplicantPayload(applicantDetails, id = null) {
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
      id,
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

/**
 * The function `mapToBeneficiaryPayload` maps the input data to a payload object for a beneficiary.
 * @param subFormData - An object containing the form data for the beneficiary. Used to update the beneficiary in database.
 * @param [id=null] - The unique identifier for the beneficiary. It is optional and can be null.
 * @returns an object with a property called "beneficiary". The "beneficiary" property contains various key-value pairs
 * that are derived from the input parameters of the function.
 */
export function mapToBeneficiaryPayload(subFormData, id = null) {
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
      id,
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

/**
 * The function `mapToForeignPaymentPayload` maps the given subFormData to a foreign payment payload object.
 * @param subFormData - An object containing the form data for a foreign payment. It includes the following properties:
 * @param [id=null] - The unique identifier for the foreign payment form. It is optional and defaults to null if not
 * provided. Used to update the foreign payment form in database.
 * @returns an object with a property "foreignPaymentForm" which contains the following properties: id, remittanceCurrency,
 * remittanceAmount, paymentCurrency, paymentAmount, localEquivalentAmount, fxContractReferenceNo, exchangeRate,
 * creditFxRate, and debitFxRate.
 */
export function mapToForeignPaymentPayload(subFormData, id = null) {
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
      id,
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

/**
 * The function `mapToPaymentPayload` takes in two objects, `mainFormData` and `subFormData`, and returns a new object that
 * combines the properties of both objects.
 * @param mainFormData - An object containing data from the main form. It includes the channelTransactionReference, which
 * is a unique identifier for the transaction.
 * @param subFormData - An object containing the payment transaction details properties.
 * @returns an object that combines the properties of `mainFormData`, `subFormPayload`, and a new property `status`.
 */
export function mapToPaymentPayload(mainFormData, subFormData, status) {
  const {
    id,
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
    id,
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
  return { ...mainFormData, ...subFormPayload, status };
}

/**
 * The function `getRejectedPaymentFiles` fetches rejected payment transactions and organizes them into files based on
 * their filenames.
 * @returns an object that contains the rejected payment files. Each file is represented by a key in the object, and the
 * value is an array of transactions associated with that file.
 */
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

/**
 * The function `mapToApplicantDetails` takes in an object and maps its properties to a new object with specific property
 * names.
 * @param curApplicantDetails - The current applicant details object that contains the existing values for the applicant.
 * @param obj - An object containing the applicant details properties.
 * @returns an object with the following properties:
 */
export function mapToApplicantDetails(curApplicantDetails, obj) {
  const {
    applicantName,
    applicantAccountNo,
    applicantAccountType,
    applicantAccountCurrency,
    applicantIdType,
    applicantId,
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
  } = obj;
  return {
    applicantDbId: curApplicantDetails.applicantDbId,
    applicantName,
    applicantAccountNo,
    applicantAccountType,
    applicantAccountCurrency,
    applicantIdType,
    applicantId,
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
  };
}

/**
 * The function `mapToMainFileDetails` maps properties from an object `obj` to a new object with properties from
 * `curMainFileDetails` and additional properties from `obj`.
 * @param curMainFileDetails - The current main file details object.
 * @param obj - An object containing the main file details properties.
 * @returns an object with the following properties: id, filename, debitType, channelTransactionReference, transactionType,
 * requestChannel, transactionDate, valueDate, businessDate, recipientReference, and otherPaymentDetails.
 */
export function mapToMainFileDetails(curMainFileDetails, obj) {
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
  } = obj;
  return {
    id: curMainFileDetails.beneficiaryDbId,
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
