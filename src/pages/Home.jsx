import React from 'react';
import UserNavBar from '../components/navigation/UserNavBar';
import ModuleNavBar from '../components/navigation/ModuleNavBar';
import Footer from './../components/Footer';

export default function Home({ children }) {
  return (
    <>
      <UserNavBar />
      <ModuleNavBar />
      {children}
      <Footer isFixed={typeof children === 'undefined'}>
        Copyright &copy; {new Date().getFullYear()} HL Bank. All Rights
        Reserved.
      </Footer>
    </>
  );
}
