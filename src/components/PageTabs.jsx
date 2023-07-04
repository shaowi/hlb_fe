import {
  Box,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Footer from './Footer';

const theme = createTheme({
  typography: {
    h4: {
      fontSize: '1.5rem'
    }
  }
});

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

export default function PageTabs({ tabsContent }) {
  const [value, setValue] = useState(0);
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsFooterFixed(newValue === 1); // Can be removed if content covers the whole page
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
          <Typography variant="h4">{tabsContent[value].title}</Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabsContent.map((tab, index) => (
              <Tab
                key={tab.label + index}
                label={tab.label}
                {...a11yProps(0)}
              />
            ))}
          </Tabs>
        </Box>
        {tabsContent.map((tab, index) => (
          <TabPanel key={tab.label + index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Paper>
      <Footer isFixed={isFooterFixed} />
    </ThemeProvider>
  );
}
