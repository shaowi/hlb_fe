import FileOpenIcon from '@mui/icons-material/FileOpen';
import ActionButtonGroup from 'components/datatable/ActionButtonGroup';
import DataTable from 'components/datatable/index';
import {
  DEBIT_TYPE,
  STATUSES,
  currentDate,
  previousMonthDate
} from 'constants';
import Loader from 'pages/Loader';
import { useRejectedPaymentStore } from 'pages/tabs/rejected_payment_main/rejected_payment_store';
import { useEffect, useState } from 'react';
import { getFileDetails, getPaymentFiles } from 'services/PaymentFileService';
import { formatToCurrency } from 'services/helper';
import PaymentFile from '../shared/PaymentFile';
import SearchBox from './SearchBox';
import { useAppStore } from 'app_store';
import AlertDialog from 'components/AlertDialog';

const { all } = STATUSES;

const viewFileToolTipText = 'View File';

/**
 * The RejectedPaymentMain component is a React component that displays a datatable of rejected payment files and allows
 * users to filter and view individual payment files.
 * @returns The function `RejectedPaymentMain` returns either the `PaymentFile` component or a combination of the
 * `SearchBox` component and the `DataTable` component.
 */
export default function RejectedPaymentMain() {
  const columns = [
    { id: 'action', label: 'Action', minWidth: 100, sortable: false },
    { id: 'filename', label: 'Filename', minWidth: 170, sortable: true },
    {
      id: 'debitType',
      label: 'Debit Type',
      minWidth: 170,
      sortable: true
    },
    {
      id: 'transactionCount',
      label: 'Total Transaction Count',
      minWidth: 120,
      sortable: true
    },
    {
      id: 'totalPaymentAmount',
      label: 'Total Payment Amount',
      minWidth: 170,
      sortable: true,
      format: (value) => formatToCurrency(value)
    },
    {
      id: 'transactionDate',
      label: 'Transaction Date',
      minWidth: 170,
      sortable: true,
      format: (value) => value.toLocaleString('en-US')
    },
    {
      id: 'businessDate',
      label: 'Business Date',
      minWidth: 170,
      sortable: true,
      format: (value) => value.toLocaleString('en-US')
    },
    {
      id: 'status',
      label: 'File Status',
      minWidth: 170,
      sortable: true
    }
  ];
  const { isMaker } = useAppStore();
  const store = useRejectedPaymentStore();
  const {
    setCurrMainFormData,
    setSubFormDataList,
    setApplicantDetails,
    setTransactionSummaryData
  } = store;
  const [loadingDatatable, setLoadingDatatable] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [initFiles, setInitFiles] = useState({});
  const [files, setFiles] = useState({});
  const [rows, setRows] = useState([]);
  const [showPaymentFile, setShowPaymentFile] = useState(false);

  useEffect(() => {
    /**
     * The function fetchFiles is an asynchronous function that fetches payment files, sets the initial files, and
     * updates the loading state of the datatable.
     */
    async function fetchFiles() {
      /**
       * The function sets initial files based on the account role, filtering out any files with a status of 'pending' if
       * the account role is not 'maker'.
       * @returns If the `isMaker` variable is true, then the function will return the result of calling the `setInitFiles`
       * function with the `files` parameter. Otherwise, the function will return the result of calling the `setInitFiles`
       * function with the `pendingFiles` object as the parameter.
       */
      function setInitFilesBasedOnAccountRole(files) {
        if (isMaker) {
          setInitFiles(files);
          return;
        }
        const pendingFiles = {};
        Object.entries(files).forEach(([key, value]) => {
          if (value[0].status === 'pending') {
            pendingFiles[key] = value;
          }
        });
        setInitFiles(pendingFiles);
      }
      try {
        const files = await getPaymentFiles();
        setInitFilesBasedOnAccountRole(files);
      } catch (error) {
        console.log(error);
        setHasError(true);
      } finally {
        setLoadingDatatable(false);
      }
    }
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterTableRecords(initialFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initFiles]);

  useEffect(() => {
    /**
     * The function `setStoreData` is an asynchronous function that retrieves file details and sets various state variables
     * based on the retrieved data.
     */
    async function setStoreData(id) {
      try {
        const [
          currMainFormData,
          applicantDetails,
          subFormDataList,
          transactionSummaryData
        ] = await getFileDetails(rows[id].filename);
        setApplicantDetails(applicantDetails);
        setCurrMainFormData(currMainFormData);
        setSubFormDataList(subFormDataList);
        setTransactionSummaryData(transactionSummaryData);
        setShowPaymentFile(true);
      } catch (error) {
        console.log(error);
      }
    }

    const rows = [];
    Object.entries(files).forEach(([key, value], index) => {
      const { debitType, transactionDate, businessDate, status } = value[0];
      const actionButtonProps = {
        buttons: [
          {
            toolTipText: viewFileToolTipText,
            componentProps: {
              onClick: () => setStoreData(index)
            },
            icon: <FileOpenIcon />
          }
        ]
      };
      const action = <ActionButtonGroup {...actionButtonProps} />;
      rows.push({
        debitType: DEBIT_TYPE[debitType],
        transactionCount: value.length,
        totalPaymentAmount: value.reduce(
          (acc, curr) => acc + curr.foreignPaymentForm.paymentAmount,
          0
        ),
        transactionDate,
        businessDate,
        status: STATUSES[status],
        filename: key,
        action
      });
    });
    setRows(rows);
  }, [
    files,
    setApplicantDetails,
    setCurrMainFormData,
    setTransactionSummaryData,
    setSubFormDataList
  ]);

  /**
   * The function `filterTableRecords` filters a table of records based on various criteria and updates the state with the
   * filtered results.
   */
  function filterTableRecords(values) {
    const filteredFiles = {};
    Object.entries(initFiles).forEach(([filename, transactions]) => {
      const { transactionDate, businessDate, status } = transactions[0];
      const matchFilename =
        values.filename === '' ||
        filename.toLowerCase().includes(values.filename.toLowerCase());
      const matchStatus =
        !('status' in values) ||
        values.status.toLowerCase() === all.toLowerCase() ||
        status.toLowerCase().includes(values.status.toLowerCase());
      const withinBusinessDate =
        businessDate >= values.businessDateFrom &&
        businessDate <= values.businessDateTo;
      const withinTransactionDate =
        (values.transactionDateFrom === '' &&
          values.transactionDateTo === '') ||
        (transactionDate >= values.transactionDateFrom &&
          transactionDate <= values.transactionDateTo);
      if (
        matchFilename &&
        matchStatus &&
        withinBusinessDate &&
        withinTransactionDate
      ) {
        filteredFiles[filename] = transactions;
      }
    });
    setFiles(filteredFiles);
  }

  function closeAlert() {
    setHasError(false);
  }

  const paymentFileProps = {
    storeProps: store,
    isCreate: false,
    setShowPaymentFile
  };

  const initialFormValues = {
    filename: '',
    status: isMaker ? 'all' : '',
    businessDateFrom: previousMonthDate,
    businessDateTo: currentDate,
    transactionDateFrom: '',
    transactionDateTo: ''
  };

  const searchBoxProps = {
    onSearch: filterTableRecords,
    initialFormValues
  };

  const dataTableProps = {
    title: 'Pending Action',
    columns,
    rows
  };

  const alertDialogProps = {
    title: 'Error in fetching table records',
    content: 'Please refresh and try again later.',
    buttons: [
      {
        type: 'button',
        label: 'Ok',
        componentProps: {
          color: 'error',
          onClick: closeAlert
        }
      }
    ],
    open: hasError,
    handleClose: closeAlert
  };

  return showPaymentFile ? (
    <PaymentFile {...paymentFileProps} />
  ) : (
    <>
      <AlertDialog {...alertDialogProps} />
      <SearchBox {...searchBoxProps} />
      {loadingDatatable ? <Loader /> : <DataTable {...dataTableProps} />}
    </>
  );
}
