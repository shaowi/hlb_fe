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

const { TEXT } = FORM_TYPES;

export default function ConfirmationSummaryForm({ onSubmit, ...props }) {
  const {
    applicantDetails,
    currMainFormData,
    subFormDataList,
    requesterComments,
    setShowConfirmationPage,
    totalTransactionCount,
    totalPaymentAmount,
    setErrorOnConfirm,
    setShowReviewPage,
    processingMode,
    paymentCurrency,
    isCreate
  } = props;

  const formAttributes = {
    sections: [
      {
        rows: [
          {
            fields: [
              {
                type: TEXT,
                defaultValue: requesterComments,
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
        type: 'button',
        componentProps: {
          color: 'success',
          onClick: handleConfirm
        }
      }
    ]
  };

  async function handleConfirm() {
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
        setShowConfirmationPage(false);
        setShowReviewPage(true);
      });
  }

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
      const paymentPayload = mapToPaymentPayload(currMainFormData, subFormData);
      const payload = {
        ...applicantPayload,
        ...beneficiaryPayload,
        ...foreignPaymentPayload,
        ...paymentPayload,
        requesterComments
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
