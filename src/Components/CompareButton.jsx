
import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { useTheme } from '../Context/ThemeContext';
import { useAlert } from '../Context/AlertContext';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(3px)',
  },
  box: {
    width: '380px',
    padding: '30px',
    textAlign: 'center',
    borderRadius: '0', 
  },
}));

const CompareButton = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const handleClose = () => setOpen(false);

  const { theme } = useTheme();
  const { setAlert } = useAlert();
  const classes = useStyles();
  const navigate = useNavigate();

  const checkUsernameAvailability = async () => {
    const ref = db.collection('usernames');
    const response = await ref.doc(username).get();
    return response.exists;
  };

  const handleSubmit = async () => {
    if (await checkUsernameAvailability()) {
      navigate(`/compare/${username}`);
      handleClose();
    } else {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Invalid username',
      });
    }
  };

  const handleClick = () => {
    if (auth.currentUser) {
      setOpen(true);
    } else {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Login to use compare',
      });
    }
  };

  return (
    <div>
      <div
        className="compare-btn"
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          backgroundColor: theme.title,
          color: theme.background,
          padding: '10px 25px',
          textAlign: 'center',
          fontWeight: '600',
          letterSpacing: '1px',
          border: `2px solid ${theme.title}`,
          transition: '0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.target.style.opacity = '1')}
      >
        COMPARE
      </div>

      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <Paper
          elevation={4}
          className={classes.box}
          style={{
            backgroundColor: theme.background,
            color: theme.title,
          }}
        >
          <Typography
            variant="h6"
            style={{
              marginBottom: '15px',
              fontWeight: '600',
              color: theme.title,
            }}
          >
            Compare with another user
          </Typography>

          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Enter Username"
            InputLabelProps={{
              style: { color: theme.title },
            }}
            InputProps={{
              style: { color: theme.title },
            }}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px' }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            style={{
              backgroundColor: theme.title,
              color: theme.background,
              fontWeight: '600',
              textTransform: 'none',
              padding: '10px 0',
            }}
            onClick={handleSubmit}
          >
            Compare
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default CompareButton;
