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

export default function ModuleNavBar({ menu }) {
  return (
    <MDBNavbar
      expand="lg"
      bgColor="primary"
      className="m-auto"
      style={{ width: '95%' }}
    >
      <MDBContainer fluid>
        <MDBNavbarNav>
          {menu.map((element, index) => (
            <NavBarItem key={element + index} item={element} />
          ))}
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
