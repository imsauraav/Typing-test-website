
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import { useAlert } from '../Context/AlertContext'
import { useTheme } from '../Context/ThemeContext'
import errorMapping from '../Utils/errorMapping'

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAlert } = useAlert()
  const { theme } = useTheme()

  const handleSubmit = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Please fill all details',
      })
      return
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setAlert({
          open: true,
          type: 'success',
          message: 'Logged in successfully!',
        })
        handleClose()
      })
      .catch((err) => {
        console.log('error', err)
        setAlert({
          open: true,
          type: 'error',
          message: errorMapping[err.code] || 'Some error occurred',
        })
      })
  }

  return (
    <Box
      p={5}
      sx={{
        width: '100%',
        maxWidth: 520, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        backgroundColor:
          theme.background === '#000000'
            ? 'rgba(255,255,255,0.08)'
            : '#ffffff',
        boxShadow:
          theme.background === '#000000'
            ? '0 6px 30px rgba(255,255,255,0.08)'
            : '0 6px 25px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color:
            theme.background === '#000000'
              ? '#ffffff'
              : '#111111',
          letterSpacing: '0.5px',
          textAlign: 'center',
        }}
      >
        Welcome👋
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color:
            theme.background === '#000000'
              ? 'rgba(255,255,255,0.75)'
              : 'rgba(0,0,0,0.7)',
          textAlign: 'center',
        }}
      >
        Please login to continue
      </Typography>

      <TextField
        fullWidth
        type="email"
        variant="outlined"
        label="Email Address"
        InputLabelProps={{
          style: {
            color:
              theme.background === '#000000'
                ? '#ffffff'
                : '#000000',
          },
        }}
        InputProps={{
          style: {
            color:
              theme.background === '#000000'
                ? '#ffffff'
                : '#000000',
            backgroundColor:
              theme.background === '#000000'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.02)',
            borderRadius: 0, 
          },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        type="password"
        variant="outlined"
        label="Password"
        InputLabelProps={{
          style: {
            color:
              theme.background === '#000000'
                ? '#ffffff'
                : '#000000',
          },
        }}
        InputProps={{
          style: {
            color:
              theme.background === '#000000'
                ? '#ffffff'
                : '#000000',
            backgroundColor:
              theme.background === '#000000'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.02)',
            borderRadius: 0, 
          },
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 0, 
          fontWeight: '600',
          fontSize: '16px',
          letterSpacing: '0.5px',
          textTransform: 'none',
          background:
            theme.background === '#000000'
              ? '#00e676'
              : '#1976d2',
          color: '#fff',
          boxShadow:
            theme.background === '#000000'
              ? '0 4px 12px rgba(0,230,118,0.3)'
              : '0 4px 12px rgba(25,118,210,0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            background:
              theme.background === '#000000'
                ? '#1de9b6'
                : '#1565c0',
          },
        }}
      >
        Login
      </Button>
    </Box>
  )
}

export default LoginForm


