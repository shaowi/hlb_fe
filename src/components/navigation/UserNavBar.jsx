import { Link, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from 'services/UserService';
import ModalBox from '../ModalBox';

/**
 * The `UserNavBar` function is a React component that renders a navigation bar with user information and a logout button.
 * @returns The UserNavBar component is returning a JSX element.
 */
export default function UserNavBar(props) {
  const { imageSrc, imageAlt, centerText, username, logoutText } = props;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalProps = {
    title: 'Logout',
    description: 'Are you sure you want to logout?',
    buttons: [
      {
        type: 'button',
        label: 'Yes',
        componentProps: {
          color: 'success',
          onClick: handleLogout
        }
      },
      {
        type: 'button',
        label: 'No',
        componentProps: {
          color: 'error',
          onClick: () => setIsModalOpen(false)
        }
      }
    ],
    isOpen: isModalOpen,
    handleClose: () => setIsModalOpen(false)
  };

  function handleLogout() {
    logOutUser();
    navigate('/login');
  }

  return (
    <>
      <ModalBox {...modalProps} />
      <Paper
        elevation={8}
        sx={{
          p: 4,
          flexGrow: 1,
          padding: 2,
          paddingLeft: 4,
          paddingRight: 4,
          width: '98%',
          margin: 'auto'
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <img src={imageSrc} alt={imageAlt} width="20%" height="auto" />
            <Link href="/home" underline="none">
              <Typography variant="h5" align="center">
                {centerText}
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" spacing={4}>
            <Link href="#" underline="none">
              <Typography variant="subtitle1" align="center">
                {username}
              </Typography>
            </Link>
            <Link
              underline="none"
              component="button"
              onClick={() => setIsModalOpen(true)}
            >
              <Typography variant="subtitle1" align="center">
                {logoutText}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
