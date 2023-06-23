import { IconButton } from '@mui/material';

export default function ActionButton({
  color = 'success',
  children,
  ...props
}) {
  return (
    <IconButton color={color} size="large" {...props}>
      {children}
    </IconButton>
  );
}
