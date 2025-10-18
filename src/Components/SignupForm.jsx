// import { Box, Button, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import { auth, db } from '../firebaseConfig';
// import { useAlert } from '../Context/AlertContext';
// import { useTheme } from '../Context/ThemeContext';
// import errorMapping from '../Utils/errorMapping';

// const SignupForm = ({handleClose}) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const {setAlert} = useAlert();
//     const {theme} = useTheme();

//     const checkUsernameAvailability = async()=>{
//         const ref = db.collection('usernames');
//         const response = await ref.doc(username).get();
//         console.log(response.exists);
//         return !response.exists;
//     }


//     const handleSubmit = async()=>{
//         if(!email || !password || !confirmPassword || !username){
//             setAlert({
//                 open: true,
//                 type: 'warning',
//                 message: 'fill all details'
//             });
//             return;
//         }
//         if(password!==confirmPassword){
//             setAlert({
//                 open: true,
//                 type: 'warning',
//                 message: 'Password Mismatch'
//             });
//             return
//         }
        
//         if(await checkUsernameAvailability()){
//             auth.createUserWithEmailAndPassword(email, password).then(async(response) => {
//                 const ref = await db.collection('usernames').doc(username).set({
//                    uid:  response.user.uid
//                 });
//                 setAlert({
//                     open: true,
//                     type: 'success',
//                     message: 'account created!'
//                 });
//                 handleClose();
//             }).catch((err) => {
//                 console.log("sign up failed", err);
//                 setAlert({
//                     open: true,
//                     type: 'error',
//                     message: errorMapping[err.code] || "Some error occured"
//                 });
//             });
//         }
//         else{
//             setAlert({
//                 open: true,
//                 type: 'warning',
//                 message: 'username taken'
//             });
//         }
        
        
//     }

//   return (
//     <Box
//         p={3}
//         style={{
//             display:"flex",
//             flexDirection:'column',
//             gap:'20px'
//         }}
//     >
//         <TextField
//             type='text'
//             variant='outlined'
//             label='Enter Username'
//             InputLabelProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             InputProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             onChange={(e)=>setUsername(e.target.value)}/>
//         <TextField
//             type='email'
//             variant='outlined'
//             label='Enter Email'
//             InputLabelProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             InputProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             onChange={(e)=>setEmail(e.target.value)}/>
//         <TextField
//             type='password'
//             variant='outlined'
//             label='Enter Password'
//             InputLabelProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             InputProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             onChange={(e)=>setPassword(e.target.value)}/>
//         <TextField
//             type='password'
//             variant='outlined'
//             label='Enter Confirm Password'
//             InputLabelProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             InputProps={{
//                 style: {
//                     color: theme.title
//                 }
//             }}
//             onChange={(e)=>setConfirmPassword(e.target.value)}/>
//         <Button
//             variant='contained'
//             size='large'
//             style={{backgroundColor: theme.title, color: theme.background}}
//             onClick={handleSubmit}>
//                 Signup
//         </Button>

//     </Box>
//   )
// }

// export default SignupForm


import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAlert } from '../Context/AlertContext'
import { useTheme } from '../Context/ThemeContext'
import errorMapping from '../Utils/errorMapping'

const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const { setAlert } = useAlert()
  const { theme } = useTheme()

  const checkUsernameAvailability = async () => {
    const ref = db.collection('usernames')
    const response = await ref.doc(username).get()
    return !response.exists
  }

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Please fill all details',
      })
      return
    }

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Password Mismatch',
      })
      return
    }

    if (await checkUsernameAvailability()) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
          await db.collection('usernames').doc(username).set({
            uid: response.user.uid,
          })
          setAlert({
            open: true,
            type: 'success',
            message: 'Account created successfully!',
          })
          handleClose()
        })
        .catch((err) => {
          console.log('sign up failed', err)
          setAlert({
            open: true,
            type: 'error',
            message: errorMapping[err.code] || 'Some error occurred',
          })
        })
    } else {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Username already taken',
      })
    }
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
        Create Your Account ✨
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
      
      </Typography>

      <TextField
        fullWidth
        type="text"
        variant="outlined"
        label="Username"
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
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <TextField
        fullWidth
        type="password"
        variant="outlined"
        label="Confirm Password"
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
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Sign Up
      </Button>
    </Box>
  )
}

export default SignupForm
