import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  ThemeProvider,
  createTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import CreatePaymentMain from '../pages/tabs/CreatePaymentMain';
import RejectedPaymentMain from '../pages/tabs/RejectedPaymentMain';
import UploadPaymentMain from '../pages/tabs/UploadPaymentMain';
import Footer from './Footer';

const theme = createTheme({
  typography: {
    h4: {
      fontSize: '1.5rem'
    }
  }
});

const REJECTED = 'Rejected Payment File';
const UPLOAD = 'Upload Payment File';
const CREATE = 'Create Payment File';

const TABS = [
  {
    label: REJECTED,
    content: <RejectedPaymentMain />
  },
  { label: UPLOAD, content: <UploadPaymentMain /> },
  { label: CREATE, content: <CreatePaymentMain /> }
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function PaymentFileTabs() {
  const [value, setValue] = useState(0);
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setIsFooterFixed(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={12}
        sx={{
          p: 4,
          flexGrow: 1,
          padding: 2,
          paddingLeft: 4,
          paddingRight: 4,
          width: '92%',
          margin: 'auto'
        }}
      >
        <Box sx={{ pt: 1, pb: 1 }}>
          <Typography variant="h4">
            {`${
              value === 1 ? 'Upload' : 'Creation'
            } of Outward ISS CBFT Credit Transfer (MT103) Payment File`}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {TABS.map((tab, index) => (
              <Tab
                key={tab.label + index}
                label={tab.label}
                {...a11yProps(0)}
              />
            ))}
          </Tabs>
        </Box>
        {TABS.map((tab, index) => (
          <TabPanel key={tab.label + index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Paper>
      <Footer isFixed={isFooterFixed} />
    </ThemeProvider>
  );
}
