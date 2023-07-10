import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from 'components/Footer';

describe('Footer', () => {
  it('should render the bankName passed by props', () => {
    render(<Footer isFixed={false} bankName="CIMB" />);
    const textElement = screen.getByText(/cimb/i);
    expect(textElement).toBeInTheDocument();
  });
});
