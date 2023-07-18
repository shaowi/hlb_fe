import { Box } from '@mui/material';
import DataTable from 'components/datatable';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import {
  createPaymentTransaction,
  mapToApplicantPayload,
  mapToBeneficiaryPayload,
  mapToForeignPaymentPayload,
  mapToPaymentPayload,
  updatePaymentTransaction
} from 'services/PaymentFileService';
import { formatToCurrency } from 'services/helper';
import { useState } from 'react';
import { SUBMIT_TYPES } from 'constants';

const { TEXT } = FORM_TYPES;
const { reject, approve, decline } = SUBMIT_TYPES;

/**
 * The `ConfirmationSummaryForm` component is a React component that displays a summary of payment details and a form for
 * confirming the payment.
 * @returns a React component.
 */
export default function ConfirmationSummaryForm(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    onSubmit,
    applicantDetails,
    currMainFormData,
    subFormDataList,
    transactionSummaryData,
    setShowConfirmationPage,
    totalTransactionCount,
    totalPaymentAmount,
    setErrorOnConfirm,
    setShowReviewPage,
    processingMode,
    paymentCurrency,
    isCreate,
    submitType
  } = props;

  const formAttributes = {
    sections: [
      {
        rows: [
          {
            fields: [
              {
                type: TEXT,
                defaultValue: transactionSummaryData?.requesterComments,
                componentProps: {
                  disabled: true,
                  name: 'requesterComments',
                  label: 'Requester Comments',
                  'data-testid': 'requesterComments',
                  multiline: true,
                  rows: 3
                }
              }
            ]
          }
        ]
      }
    ],
    buttons: [
      {
        label: 'Back',
        type: 'button',
        componentProps: {
          color: 'neutral',
          onClick: () => setShowConfirmationPage(false)
        }
      },
      {
        label: 'Confirm',
        type: 'loading',
        isLoading: isSubmitting,
        componentProps: {
          color: 'success',
          onClick: handleConfirm
        }
      }
    ]
  };

  /**
   * The function `handleConfirm` is an asynchronous function that handles the confirmation process for an applicant,
   * including saving payment files, checking for errors, and updating the state of the application.
   */
  async function handleConfirm() {
    setIsSubmitting(true);
    const applicantId = isCreate ? null : applicantDetails.applicantDbId;
    const applicantPayload = mapToApplicantPayload(
      applicantDetails,
      applicantId
    );
    savePaymentFiles(applicantPayload, currMainFormData, subFormDataList)
      .then((values) => {
        const expectedStatusCode = isCreate ? 201 : 200;
        setErrorOnConfirm(
          values.some(({ status }) => status !== expectedStatusCode)
        );
      })
      .catch(() => {
        setErrorOnConfirm(true);
      })
      .finally(() => {
        setIsSubmitting(false);
        setShowConfirmationPage(false);
        setShowReviewPage(true);
      });
  }

  /**
   * The function `savePaymentFiles` takes in applicant data, main form data, and a list of sub form data, and returns a
   * promise that resolves when all the payment transactions are created or updated.
   * @returns a promise that resolves to an array of results from the resolved promises in the `resolvedPromisesArray`.
   */
  async function savePaymentFiles(
    applicantPayload,
    currMainFormData,
    subFormDataList
  ) {
    const resolvedPromisesArray = subFormDataList.map((subFormData) => {
      const beneficiaryId = isCreate ? null : subFormData.beneficiaryDbId;
      const beneficiaryPayload = mapToBeneficiaryPayload(
        subFormData,
        beneficiaryId
      );
      const paymentId = isCreate ? null : subFormData.paymentId;
      const foreignPaymentPayload = mapToForeignPaymentPayload(
        subFormData,
        paymentId
      );
      const newStatus =
        submitType === reject
          ? 'rejected'
          : submitType === decline
          ? 'declined'
          : submitType === approve
          ? 'approved'
          : 'pending';
      const paymentPayload = mapToPaymentPayload(
        currMainFormData,
        subFormData,
        newStatus
      );
      const payload = {
        ...applicantPayload,
        ...beneficiaryPayload,
        ...foreignPaymentPayload,
        ...paymentPayload,
        ...transactionSummaryData
      };
      return isCreate
        ? createPaymentTransaction(payload)
        : updatePaymentTransaction(payload);
    });
    return Promise.all(resolvedPromisesArray);
  }

  const columns = [
    {
      id: 'processingMode',
      label: 'Processing Mode',
      minWidth: 200
    },
    {
      id: 'transactionCount',
      label: 'Transaction Count',
      minWidth: 200
    },
    {
      id: 'paymentCurrency',
      label: 'Payment Currency',
      minWidth: 200
    },
    {
      id: 'totalPaymentAmount',
      label: 'Total Payment Amount',
      minWidth: 200,
      format: (value) => formatToCurrency(value)
    }
  ];
  const rows = [
    {
      processingMode,
      transactionCount: totalTransactionCount,
      paymentCurrency,
      totalPaymentAmount: totalPaymentAmount
    }
  ];

  const dataTableProps = {
    title: 'Summary',
    columns,
    rows,
    showPagination: false
  };

  const formBuilderProps = {
    onSubmit,
    formAttributes
  };

  return (
    <Box sx={{ mt: 3 }}>
      <DataTable {...dataTableProps} />
      <FormBuilder {...formBuilderProps} />
    </Box>
  );
}
