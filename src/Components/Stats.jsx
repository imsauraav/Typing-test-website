
import React, { useEffect } from 'react';
import Graph from './Graph';
import { db, auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Typography, Paper, Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTheme } from '../Context/ThemeContext';

const Stats = ({ wpm, resetTest, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData }) => {
    const { setAlert } = useAlert();
    const { theme } = useTheme();
    const [user] = useAuthState(auth);

    const timeSet = new Set();
    const newGraph = graphData.filter((i) => {
        if (!timeSet.has(i[0])) {
            timeSet.add(i[0]);
            return i;
        }
    });

   
    const pushResultToDatabase = () => {
        const resultsRef = db.collection('Results');
        const { uid } = auth.currentUser;
        if (!isNaN(accuracy)) {
            resultsRef.add({
                wpm: wpm,
                accuracy: accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                userID: uid,
                timeStamp: new Date(),
            }).then(() => {
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'Result saved to database',
                });
            });
        } else {
            setAlert({
                open: true,
                type: 'error',
                message: 'Invalid test',
            });
        }
    };

    useEffect(() => {
        if (user) {
            pushResultToDatabase();
        } else {
            setAlert({
                open: true,
                type: 'warning',
                message: 'Login to save results',
            });
        }
    }, []);

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                padding: 3,
                gap: 4,
                backgroundColor: `${theme.background}CC`,
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                alignItems: 'stretch',
            }}
        >
            {/* Left Stats */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" sx={{ color: theme.title, fontWeight: 600 }}>
                    WPM
                </Typography>
                <Typography variant="h4" sx={{ color: theme.title }}>
                    {wpm}
                </Typography>

                <Typography variant="h5" sx={{ color: theme.title, fontWeight: 600 }}>
                    Accuracy
                </Typography>
                <Typography variant="h4" sx={{ color: theme.title }}>
                    {accuracy}%
                </Typography>

                <Typography variant="h5" sx={{ color: theme.title, fontWeight: 600 }}>
                    Characters
                </Typography>
                <Typography variant="h4" sx={{ color: theme.title }}>
                    {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<RestartAltIcon />}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.title,
                        color: theme.background,
                        '&:hover': { opacity: 0.8 },
                    }}
                    onClick={resetTest}
                >
                    Restart
                </Button>
            </Box>

            {/* Right Graph */}
            <Box sx={{ flex: 1, minHeight: '300px' }}>
                <Graph graphData={newGraph} />
            </Box>
        </Paper>
    );
};

export default Stats;
