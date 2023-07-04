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
 const prop = [
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

<ModuleNavBar menu={prop} />
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
