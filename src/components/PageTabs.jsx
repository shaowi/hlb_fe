import {
  Box,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { theme } from 'theme';
import Footer from './Footer';

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

/** A React functional component called `PageTabs`. It takes a prop called `tabsContent`, which is an array of objects representing the content of each tab. */
export default function PageTabs({ tabsContent }) {
  const [value, setValue] = useState(1);
  const [isFooterFixed, setIsFooterFixed] = useState(false); // Can be removed if content can cover the whole page

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsFooterFixed(newValue === 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={12}
        sx={{
          p: 2,
          flexGrow: 1,
          paddingLeft: 4,
          paddingRight: 4,
          width: '92%',
          margin: 'auto'
        }}
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="h4">{tabsContent[value].title}</Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basicTabs">
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
