import { Box, Button, Grid } from '@mui/material';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { FILENAME_FORMAT } from 'constants';
import CSVReader from 'react-csv-reader';
import { toCamelCase } from 'services/helper';

export default function UploadButton({ handleForce }) {
  const papaParseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => toCamelCase(header)
  };
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={2}>
          <ToolTipWrapper title={FILENAME_FORMAT}>
            <Button variant="contained" component="label">
              choose file
              <CSVReader
                inputId="CSVReader"
                inputStyle={{ display: 'none' }}
                onFileLoaded={handleForce}
                parserOptions={papaParseOptions}
              />
            </Button>
          </ToolTipWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}
