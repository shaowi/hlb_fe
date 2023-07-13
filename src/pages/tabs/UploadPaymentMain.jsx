import { Box, Button, Grid } from '@mui/material';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { FILENAME_FORMAT } from 'constants';

export default function UploadPaymentMain() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={2}>
          <ToolTipWrapper title={FILENAME_FORMAT}>
            <Button variant="contained" component="label">
              choose file
              <input type="file" hidden />
            </Button>
          </ToolTipWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}
