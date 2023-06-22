import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-react-ui-kit';
import './index.css';
import { Link } from 'react-router-dom';

const MENU_ITEMS = [
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
];

const ItemHeader = ({ item }) =>
  item.hasOwnProperty('items') ? (
    <MDBDropdownToggle>{item.name}</MDBDropdownToggle>
  ) : (
    <MDBDropdownItem link={item.link}>{item.name}</MDBDropdownItem>
  );

const SubMenuItem = ({ item }) => {
  if (!item.hasOwnProperty('items')) {
    return (
      <Link to={item.link}>
        <MDBDropdownItem className="dropdown-item">{item.name}</MDBDropdownItem>
      </Link>
    );
  }
  return (
    <MDBDropdownItem className="dropdown-item">
      <p className="m-0">{item.name} &raquo;</p>
      <ul className="dropdown-menu dropdown-submenu">
        {item.items.map((element, index) => (
          <SubMenuItem key={element + index} item={element} />
        ))}
      </ul>
    </MDBDropdownItem>
  );
};

const NavBarItem = ({ item }) => (
  <MDBNavbarItem>
    <MDBDropdown>
      <ItemHeader item={item} />
      <MDBDropdownMenu>
        {item.items.map((element, index) => (
          <SubMenuItem key={element + index} item={element} />
        ))}
      </MDBDropdownMenu>
    </MDBDropdown>
  </MDBNavbarItem>
);

export default function ModuleNavBar() {
  return (
    <MDBNavbar
      expand="lg"
      bgColor="primary"
      className="m-auto"
      style={{ width: '95%' }}
    >
      <MDBContainer fluid>
        <MDBNavbarNav>
          {MENU_ITEMS.map((element, index) => (
            <NavBarItem key={element + index} item={element} />
          ))}
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
