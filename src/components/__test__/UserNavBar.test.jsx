import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserNavBar from 'components/navigation/UserNavBar';

xdescribe('UserNavBar', () => {
  const props = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    username: 'phbmaker',
    logoutText: 'Logout'
  };

  it('should render the text passed by props', () => {
    render(<UserNavBar {...props} />);
    const imageElement = screen.getByAltText(/hlb/i);
    const centerTextElement = screen.getByText(
      /payment gateway biz ops portal/i
    );
    const usernameElement = screen.getByText(/phbmaker/i);
    const logoutTextElement = screen.getByText(/logout/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/images/logo.png');
    expect(centerTextElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(logoutTextElement).toBeInTheDocument();
  });

  it('should direct to home page when centerText is clicked', () => {
    render(<UserNavBar {...props} />);
    const linkElement = screen.getByRole('link', {
      name: /payment gateway biz ops portal/i
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/home');
  });

  it('should direct to /login when centerText is clicked', () => {
    render(<UserNavBar {...props} />);
    const linkElement = screen.getByRole('link', {
      name: /logout/i
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
  });
});
