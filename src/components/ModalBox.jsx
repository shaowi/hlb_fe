import { Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormButton from 'components/forms_ui/buttons/FormButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

/** A React functional component called `ModalBox`. It takes in several props: `isOpen`, `handleClose`,
`title`, `description`, and `buttons`. */
export default function ModalBox(props) {
  const { isOpen, handleClose, title, description, buttons } = props;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
            {buttons.map((buttonProps, index) => (
              <Grid item key={index}>
                <FormButton {...buttonProps} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
