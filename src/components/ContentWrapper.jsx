import { Box, Paper, Typography } from '@mui/material';

export default function ContentWrapper(props) {
  const { children, title } = props;

  return (
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
        <Typography variant="h4">{title}</Typography>
      </Box>
      {children}
    </Paper>
  );
}
