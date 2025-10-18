
import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Context/ThemeContext';
import { themeOptions } from '../Utils/theme';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, IconButton, Typography } from '@mui/material';

const Footer = () => {
    const { theme, setTheme, defaultTheme } = useTheme();

    const handleThemeChange = (e) => {
        setTheme(e.value);
        localStorage.setItem('theme', JSON.stringify(e.value));
    };

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                padding: '15px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backdropFilter: 'blur(12px)',
                backgroundColor: `${theme.background}CC`,
                boxShadow: '0 -2px 15px rgba(0,0,0,0.05)',
                borderRadius: '0px',
                flexWrap: 'wrap',
                position: 'relative',
            }}
        >
            {/* Social Links (left side) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                    href="https://github.com/imsauraav"
                    target="_blank"
                    sx={{
                        color: theme.title,
                        transition: '0.3s',
                        '&:hover': { color: '#6e5494', transform: 'scale(1.2)' }
                    }}
                >
                    <GitHubIcon fontSize="medium" />
                </IconButton>
                <IconButton
                    href="https://www.linkedin.com/in/saurav-kumar-ba7a2b338/"
                    target="_blank"
                    sx={{
                        color: theme.title,
                        transition: '0.3s',
                        '&:hover': { color: '#0a66c2', transform: 'scale(1.2)' }
                    }}
                >
                    <LinkedInIcon fontSize="medium" />
                </IconButton>
            </Box>

            {/* Press TAB (center) */}
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.title,
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                    }}
                >
                    Press <kbd style={{
                        backgroundColor: theme.title,
                        color: theme.background,
                        padding: '2px 5px',
                        borderRadius: '4px',
                        fontWeight: '600'
                    }}>TAB</kbd> to open commands
                </Typography>
            </Box>

            {/* Theme Selector (right side) */}
            <Box sx={{ width: { xs: '100%', sm: '180px' } }}>
                <Select
                    options={themeOptions}
                    onChange={handleThemeChange}
                    menuPlacement="top"
                    defaultValue={{ value: defaultTheme, label: defaultTheme.label }}
                    styles={{
                        control: (styles) => ({
                            ...styles,
                            backgroundColor: `${theme.background}AA`,
                            borderColor: theme.title,
                            borderRadius: '6px',
                            boxShadow: 'none',
                            '&:hover': { borderColor: theme.title },
                        }),
                        menu: (styles) => ({ ...styles, backgroundColor: theme.background }),
                        option: (styles, { isFocused }) => ({
                            ...styles,
                            backgroundColor: isFocused ? theme.title : theme.background,
                            color: isFocused ? theme.background : theme.title,
                            cursor: 'pointer',
                        }),
                        singleValue: (styles) => ({ ...styles, color: theme.title }),
                    }}
                />
            </Box>
        </Box>
    );
};

export default Footer;





