import React from 'react';
import UserNavBar from '../components/navigation/UserNavBar';
import ModuleNavBar from '../components/navigation/ModuleNavBar';
import Footer from './../components/Footer';
import PaymentFileTabs from './../components/PaymentFileTabs';

export default function Home() {
  return (
    <>
      <UserNavBar />
      <ModuleNavBar />
      <PaymentFileTabs />
      <Footer />
    </>
  );
}
