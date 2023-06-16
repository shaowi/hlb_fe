import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Copyright from '../Copyright';

xdescribe('Test the component CopyRight', () => {
  it('should render the text passed by props content', () => {
    render(<Copyright content="Copyright @ 2023" />);
    const linkElement = screen.getByText(/copyright @ 2023/i);
    expect(linkElement).toBeInTheDocument();
  });
});
