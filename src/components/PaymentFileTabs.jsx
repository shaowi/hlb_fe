import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';

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
  { label: REJECTED, value: 0, content: 'Rejected Payment File' },
  { label: UPLOAD, value: 1, content: 'Upload Payment File' },
  { label: CREATE, value: 2, content: 'Create Payment File' }
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            {TABS.map((tab) => (
              <Tab label={tab.label} {...a11yProps(0)} />
            ))}
          </Tabs>
        </Box>
        {TABS.map((tab) => (
          <TabPanel value={value} index={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </Paper>
    </ThemeProvider>
  );
}
