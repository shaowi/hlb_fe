import { Box } from '@mui/material';
import DataTable from 'components/datatable';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { useMemo } from 'react';
import {
  createPaymentFile,
  mapToApplicantPayload,
  mapToBeneficiaryPayload,
  mapToPaymentPayload,
  mapToForeignPaymentPayload
} from 'services/PaymentFileService';
import { formatToCurrency } from 'services/helper';

const { TEXT } = FORM_TYPES;

export default function ConfirmationSummaryForm({ onSubmit, ...props }) {
  const {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    subFormDataList,
    requesterComments,
    setShowConfirmationPage,
    setShowReviewPage,
    setErrorInCreation,
    transactionRows
  } = props;
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = useMemo(() => {
    return transactionRows.reduce(
      (acc, curr) => acc + curr.remittanceAmount,
      0
    );
  }, [transactionRows]);

  const summaryColumns = [
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

  const { processingMode, paymentCurrency } = currSubFormData;
  const summaryRow = [
    {
      processingMode,
      transactionCount: totalTransactionCount,
      paymentCurrency,
      totalPaymentAmount: totalPaymentAmount
    }
  ];

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
    const applicantPayload = mapToApplicantPayload(applicantDetails);
    handleCreatePaymentFiles(
      applicantPayload,
      currMainFormData,
      subFormDataList
    )
      .then((values) => {
        setErrorInCreation(values.some(({ status }) => status !== 201));
      })
      .catch(() => {
        setErrorInCreation(true);
      })
      .finally(() => {
        setShowConfirmationPage(false);
        setShowReviewPage(true);
      });
  }

  async function handleCreatePaymentFiles(
    applicantPayload,
    currMainFormData,
    subFormDataList
  ) {
    const resolvedPromisesArray = subFormDataList.map((subFormData) => {
      const beneficiaryPayload = mapToBeneficiaryPayload(subFormData);
      const foreignPaymentPayload = mapToForeignPaymentPayload(subFormData);
      const paymentPayload = mapToPaymentPayload(currMainFormData, subFormData);
      const payload = {
        ...applicantPayload,
        ...beneficiaryPayload,
        ...foreignPaymentPayload,
        ...paymentPayload,
        requesterComments
      };
      return createPaymentFile(payload);
    });
    return Promise.all(resolvedPromisesArray);
  }

  return (
    <Box sx={{ mt: 3 }}>
      <DataTable
        title="Summary"
        columns={summaryColumns}
        rows={summaryRow}
        showPagination={false}
      />
      <FormBuilder onSubmit={onSubmit} formAttributes={formAttributes} />
    </Box>
  );
}
