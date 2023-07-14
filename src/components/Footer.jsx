import { MDBFooter } from 'mdb-react-ui-kit';

/**
 * The Footer component is a React functional component that renders a footer element with a fixed position at the bottom
 * of the page, displaying the bank name and the current year.
 * @returns a JSX element representing a footer component. The footer component is styled using the MDBFooter component
 * from the MDBReact library. The footer has a primary background color and is centered horizontally and vertically. The
 * footer can also be fixed to the bottom of the page if the `isFixed` prop is set to true. The footer contains a text
 * element that displays the current year and the bank
 */
export default function Footer({ isFixed, bankName = 'HL Bank' }) {
  return (
    <MDBFooter
      bgColor="primary"
      className={`m-auto mb-1 text-white text-center text-lg-left ${
        isFixed ? 'fixed-bottom' : ''
      }`}
      style={{ width: '98%' }}
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        Copyright &copy; {new Date().getFullYear()} {bankName}. All Rights
        Reserved.
      </div>
    </MDBFooter>
  );
}
