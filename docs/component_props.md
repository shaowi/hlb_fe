# Interfaces of component props

This page covers the props type and an example of the component usage.

[Login](../src/pages/Login.jsx)

```ts
  interface LoginProps {
    imageSrc: string;
    imageAlt: string;
    centerText: string;
    version: string;
    footerText: string;
    formHeaderText: string;
    formFieldLabels: string[];
  }
```

E.g:

![login_component](./images/loginComponent.png)

```js
const props = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    version: 'v0.1',
    footerText: `Copyright © ${new Date().getFullYear()} HL Bank. All Rights Reserved.`,
    formHeaderText: 'Log in',
    formFieldLabels: ['Username', 'Password']
}

<Login {...props} />
```

[UserNavBar](../src/components/navigation/UserNavBar.jsx)

```ts
  interface UserNavBarProps {
    imageSrc: string;
    imageAlt: string;
    centerText: string;
    username: string;
    logoutText: string;
  }
```

E.g:

![userNavBar_component](./images/userNavBarComponent.png)

```js
const props = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    username: 'phbmaker',
    logoutText: 'Logout'
}

<UserNavBar {...props} />
```

[ModuleNavBar](../src/components/navigation/ModuleNavBar.jsx)

```ts
interface ModuleNavBarMenu {
  name: string;
  items: ModuleNavBarMenuItem[] | ModuleNavBarMenu[];
}

interface ModuleNavBarMenuItem {
  name: string;
  link: string;
}
```

E.g:

![moduleNavBar_component](./images/moduleNavBarComponent.png)

```js
 const props = [
  {
    name: 'Create Transaction',
    items: [
      {
        name: 'Bulk Outward Credit Transfer',
        items: [
          {
            name: 'Creation of Outward ISS CBFT Credit Transfer (MT103)',
            link: '/outward-iss-cbft-credit-transfer'
          },
          {
            name: 'Creation of Outward ISS MEPS Credit Transfer (MT103)',
            link: '/outward-iss-meps-credit-transfer'
          },
          {
            name: 'Creation of Outward ISS IBG Credit Transfer',
            link: '/outward-iss-ibg-credit-transfer'
          },
          {
            name: 'Creation of Outward ISS G3 FAST Credit Transfer',
            link: '/outward-iss-g3-fast-credit-transfer'
          },
          {
            name: 'Review of Outward ISS CBFT Credit Transfer (MT103)',
            link: '/review-outward-iss-cbft-credit-transfer'
          },
          {
            name: 'Review of Outward ISS IBG Credit Transfer',
            link: '/review-outward-iss-ibg-credit-transfer'
          }
        ]
      },
      {
        name: 'Online Outward Credit Transfer',
        items: [
          {
            name: 'Creation of Outward ISS CBFT Credit Transfer (MT103)',
            link: '/outward-iss-cbft-credit-transfer'
          },
          {
            name: 'Creation of Outward ISS MEPS Credit Transfer (MT103)',
            link: '/outward-iss-meps-credit-transfer'
          },
          {
            name: 'Creation of Outward Intra-Bank Credit Transfer',
            link: '/outward-intra-bank-credit-transfer'
          },
          {
            name: 'Creation of Outward ISS G3 FAST Credit Transfer',
            link: '/outward-iss-g3-fast-credit-transfer'
          },
          {
            name: 'Review of Outward ISS CBFT Credit Transfer (MT103)',
            link: '/review-outward-iss-cbft-credit-transfer'
          },
          {
            name: 'Review of Outward ISS MEPS Credit Transfer (MT103)',
            link: '/review-outward-iss-meps-credit-transfer'
          },
          {
            name: 'Review of Outward ISS G3 FAST Credit Transfer',
            link: '/review-outward-iss-g3-fast-credit-transfer'
          },
          {
            name: 'Review of Outward Intra-Bank Credit Transfer',
            link: '/review-outward-intra-bank-credit-transfer'
          }
        ]
      }
    ]
  },
  {
    name: 'Release Transaction',
    items: [
      {
        name: 'Release/Reject On-Hold Transaction Request',
        link: '/release-reject-on-hold-transaction-request'
      },
      {
        name: 'Resubmit/Reject Funding Failed Transaction Request',
        link: '/resubmit-reject-funding-failed-transaction-request'
      },
      {
        name: 'Review of Release/Reject On-Hold Transaction Request',
        link: '/review-release-reject-on-hold-transaction-request'
      },
      {
        name: 'Review of Resubmit/Reject Funding Failed Transaction Request',
        link: '/review-resubmit-reject-funding-failed-transaction-request'
      }
    ]
  }
]

<ModuleNavBar menu={props} />
```

[Footer](../src/components/Footer.jsx)

```ts
  interface FooterProps {
    isFixed: boolean; // Set fixed at bottom if true
    bankName: string;
  }
```

E.g:

![footer_component](./images/footerComponent.png)

```js
const props = {
    isFixed: true,
    bankName: 'HL Bank',
}

<Footer {...props} />
```

[PageTabs](../src/components/PageTabs.jsx)

```ts
  interface PaymentFileTabsProps {
    title: string;
    label: string;
    content: React.ReactNode;
  }

```

E.g:

![pageTabs_component](./images/pageTabsComponent.png)

```js
const props = [
    {
      title:
        'Creation of Outward ISS CBFT Credit Transfer (MT103) Payment File',
      label: REJECTED_PAYMENT_FILE,
      content: <RejectedPaymentMain />
    },
    {
      title: 'Upload of Outward ISS CBFT Credit Transfer (MT103) Payment File',
      label: UPLOAD_PAYMENT_FILE,
      content: <UploadPaymentMain />
    },
    {
      title:
        'Creation of Outward ISS CBFT Credit Transfer (MT103) Payment File',
      label: CREATE_PAYMENT_FILE,
      content: <CreatePaymentMain />
    }
  ];

 <PageTabs tabsContent={props} />
```

[Datatable](../src/components/datatable/index.jsx)

```ts
interface Column {
  id: string;
  label: string;
  minWidth: number;
  sortable: boolean;
  format?: (value: number) => string;
}

interface DatatableProps {
  title: string;
  columns: Column[];
  rows: Object[];
}
```

E.g:

![datatable_component](./images/datatableComponent.png)

```js
const columnsProp = [
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

const rowsProp = [
  {
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton onClick={() => console.log('row 0 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000021.csv',
    debitType: 'Single Debit',
    transactionCount: 2,
    totalPaymentAmount: 19957.5,
    transactionDate: '2023-04-15',
    businessDate: '2023-05-15',
    status: 'REJECTED'
  },
  {
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton onClick={() => console.log('row 1 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000022.csv',
    debitType: 'Multiple Debit',
    transactionCount: 2,
    totalPaymentAmount: 900.5,
    transactionDate: '2023-05-15',
    businessDate: '2023-06-15',
    status: 'FAILED'
  },
  {
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton onClick={() => console.log('row 2 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000023.csv',
    debitType: 'Single Debit',
    transactionCount: 2,
    totalPaymentAmount: 800.5,
    transactionDate: '2023-05-15',
    businessDate: '2023-06-15',
    status: 'PENDING'
  }
];

<DataTable title="Pending Action" columns={columnsProp} rows={rowsProp} />
```

[FormBuilder](../src/components/forms_ui/FormBuilder.jsx)

```ts
interface FormAttribute {
  type: 'text' | 'select' | 'select-autocomplete' | 'date' | 'label'
  defaultValue: string;
  componentProps: {
    name: string;
    label: string;
    'data-testid': string;
    options?: Option[];
    required?: boolean;
    disabled?: boolean;
  };
  validateDateComparison?: {
    other: string;
    func: (values: string[], schema: any) => any;
  };
}

interface Section {
  title: {
    value: string;
    variant: string;
  };
  rows: {
    fields: FormAttribute[];
  }[];
}

interface Button {
  label: string;
  color?: string;
  isReset?: boolean;
}

interface Option {
  value: string;
  label: string;
}

interface FormAttributes {
  sections: Section[];
  buttons: Button[];
}

interface FormBuilderProps {
  formAttributes: FormAttributes;
  onSubmit: Function
}
```

E.g:

![formBuilder_component](./images/formBuilderComponent.png)

```js
const formAttributesProp = {
    sections: [
      {
        title: {
          value: 'Search Criteria',
          variant: 'h4'
        },
        rows: [
          {
            fields: [
              {
                type: TEXT,
                defaultValue: '',
                componentProps: {
                  name: 'filename',
                  label: 'Filename',
                  'data-testid': 'filename'
                }
              },
              {
                type: SELECT,
                defaultValue: '',
                componentProps: {
                  required: true,
                  name: 'status',
                  label: 'Status',
                  'data-testid': 'status',
                  options: STATUSES
                }
              }
            ]
          },
          {
            fields: [
              {
                type: DATE,
                defaultValue: previousMonthDate,
                componentProps: {
                  required: true,
                  name: 'businessDateFrom',
                  label: 'Business Date(From)',
                  'data-testid': 'businessDateFrom'
                }
              },
              {
                type: DATE,
                defaultValue: currentDate,
                componentProps: {
                  required: true,
                  name: 'businessDateTo',
                  label: 'Business Date(To)',
                  'data-testid': 'businessDateTo'
                },
                validateDateComparison: {
                  other: 'businessDateFrom',
                  func: ([businessDateFrom], schema) => {
                    return businessDateFrom
                      ? schema.min(
                          businessDateFrom,
                          'Business Date(To) must be later than Business Date(From)'
                        )
                      : schema;
                  }
                }
              }
            ]
          },
          {
            fields: [
              {
                type: DATE,
                defaultValue: '',
                componentProps: {
                  name: 'transactionDateFrom',
                  label: 'Transaction Date(From)',
                  'data-testid': 'transactionDateFrom'
                }
              },
              {
                type: DATE,
                defaultValue: '',
                componentProps: {
                  name: 'transactionDateTo',
                  label: 'Transaction Date(To)',
                  'data-testid': 'transactionDateTo'
                },
                validateDateComparison: {
                  other: 'transactionDateFrom',
                  func: ([transactionDateFrom], schema) => {
                    return transactionDateFrom
                      ? schema.min(
                          transactionDateFrom,
                          'Transaction Date(To) must be later than Transaction Date(From)'
                        )
                      : schema;
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    buttons: [
      {
        label: 'Search',
        color: 'success'
      },
      {
        label: 'Reset',
        isReset: true
      }
    ]
  };

<FormBuilder onSubmit={() => console.log('submit')} formAttributes={formAttributesProp} />
```