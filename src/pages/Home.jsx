import React from 'react';
import UserNavBar from '../components/navigation/UserNavBar';
import ModuleNavBar from '../components/navigation/ModuleNavBar';

export default function Home({ children }) {
  return (
    <>
      <UserNavBar />
      <ModuleNavBar />
      {children}
    </>
  );
}
