import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormButton from './forms_ui/buttons/FormButton';

export default function AlertDialog({ open, handleClose, ...props }) {
  const { title, content, buttons } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => (
          <FormButton
            key={index}
            componentProps={button.componentProps}
            label={button.label}
          />
        ))}
      </DialogActions>
    </Dialog>
  );
}
