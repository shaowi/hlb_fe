import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer({ isFixed, children }) {
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
        {children}
      </div>
    </MDBFooter>
  );
}
